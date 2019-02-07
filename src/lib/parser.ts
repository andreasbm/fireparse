import { defaultParserConfig, HTML, IParserConfig, ISyntaxNode, ParsingState } from "./model";
import { sanitize } from "./sanitize";

/**
 * Creates a parser with a configuration.
 * @param config
 */
export function createParser (config: Partial<IParserConfig>) {
	return (source: string) => parse(source, {...defaultParserConfig, ...config});
}

/**
 * Parses a markdown source to html.
 * @param source
 * @param config
 */
export function parse (source: string, config: IParserConfig): HTML {
	if (!source) {
		return "";
	}

	return html(syntaxTree(source, config), config.initialState);
}

/**
 * Creates a syntax tree based on the rules of the language.
 * @param source
 * @param config
 * @returns {any} A syntax tree
 */
export function syntaxTree (source: string, config: IParserConfig): ISyntaxNode[] {
	return nestedParse(preprocess(source, config), config.initialState, config);
}

/**
 * Turns a syntax tree into HTML based on the rules of the language.
 * @param syntaxTree
 * @param state The current parsing state (Block at the initial level)
 * @returns {string} HTML.
 */
export function html (syntaxTree: ISyntaxNode[], state: ParsingState): HTML {
	let html = "";

	// Loop through the syntax tree and append the HTML.
	// Pass the nestedCreateHtml method into the recursive call.
	for (const node of syntaxTree) {
		html += node.rule.html(node, nestedCreateHtml, state);
	}
	return html;
}


/**
 * Prints a debug message if the flag is active. The reason why a method is
 * passed is to avoid unnecessary string building.
 *
 * WARNING: When the debug flag is active, and a long string is used as parameter for the parsing,
 * the performance will be reduced because of a lot of console prints.
 *
 * @param text
 * @param css
 */
function printDebug (text: () => string, css: string = "") {
	console.log("%c" + text(), css);
}

/**
 * Preprocesses the string by sanitizing it and making the string easier to work with.
 * @param source
 * @param config
 * @returns {string}
 */
function preprocess (source: string, config: IParserConfig): string {
	if (!config.allowHtml) {
		source = sanitize(source);
	}

	return source.replace(/\r\n?/g, "\n")
	             .replace(/\f/g, "")
	             .replace(/\t/g, "     ");
}

/**
 * Creates HTML based on a syntax node.
 * @param node
 * @param state The current parsing state.
 * @returns {string}
 */
function nestedCreateHtml (node: ISyntaxNode, state: ParsingState): string {
	if (typeof node.content === "string") {
		// !! Recursive base case!! If the content is a string, simply append it.
		return <string>node.content;

	} else {
		// If the content is a sub syntax tree, parse the nodes recursively.
		return html(<ISyntaxNode[]>node.content, state);
	}
}

/**
 * Creates a syntax tree based on a string.
 * @param source
 * @param state
 * @param config
 * @returns {ISyntaxNode[]}
 */
function nestedParse (source: string, state: ParsingState, config: IParserConfig): ISyntaxNode[] {
	let result: ISyntaxNode[] = [];

	// Debug
	let debugOffset = (state === ParsingState.INLINE) ? "\t\t" : "";
	if (config.debug) {
		printDebug(() => {
			return `${debugOffset}#### Parsing: ${source}. State: ${ParsingState[state]}`;
		}, "background: black; color: white;");
	}

	// ==============================
	// While the source is neither null or empty, loop through it.
	// All rules try to match from the start of the string.
	// When one of the rules matches, the part that matched is removed from the source string.
	// This continues until the whole source have matches at least one rule.
	// ==============================
	while (source) {
		let foundMatch = false;

		// Loop through all rules and try to find a match.
		for (let rule of config.rules) {
			let match: RegExpExecArray | null = null;

			// If the rule is allowed in the current parsing state, try to match it.
			if (rule.state === state || rule.state === ParsingState.ANY) {
				match = rule.regex.exec(source);
			}

			// A match was found
			if (match != null) {

				// Debug
				if (config.debug) {
					printDebug(() => {
						return `${debugOffset}Checked rule: ${rule.name}..`;
					}, "color: blue;background: white;");

					printDebug(() => {
						return `${debugOffset}!!!! Match! >>${(<any>match || {})[0]}<<`;
					}, "background: green; color: white;");
				}

				// Since all rules start matching from the start of the line, we can safely take a little bite of the source.
				source = source.substring(match[0].length);

				// Debug
				if (config.debug) {
					printDebug(() => {
						return `${debugOffset}The source was reduced to: >>${source}<<`;
					});
				}

				// Since tags can nest, we have to recursively check the part that matched.
				let data = rule.parse(match, nestedParse, state, config);

				result.push(data);
				foundMatch = true;
				break;
			}
		}

		// It is required that at least one of the rule matches the source. If none of the rules matches, break it to avoid infinite loop.
		if (!foundMatch) {
			throw new Error(`Could not find rule to match content: ${source}. At least one rule is required to match.`);
		}
	}

	return result;
}