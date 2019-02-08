import { createHtmlTag } from "./create-html-tag";
import { HtmlFunction, IParserConfig, IRule, ISyntaxNode, NestedOutputFunction, NestedParseFunction, ParseFunction, ParsingState } from "./model";

/**
 * Returns the default create html tag continuation function.
 * @param tag
 */
export function defaultCreateHtmlTagContinuation (tag: string): HtmlFunction {
	return (node: ISyntaxNode,
	        output: NestedOutputFunction,
	        state: ParsingState) => createHtmlTag(tag, output(node, state));
}

/**
 * Returns the default create html tag continuation function.
 * @param rule
 */
export function defaultParseContinuation (getRule: () => IRule): ParseFunction {
	return (match: RegExpExecArray,
	        parse: NestedParseFunction,
	        state: ParsingState,
	        config: IParserConfig) => {
		return {
			content: parse(match[1], state, config),
			rule: getRule()
		};
	};
}
