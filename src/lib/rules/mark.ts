import { createHtmlTag } from "../create-html-tag";
import { HTML, IParserConfig, IRule, ISyntaxNode, NestedOutputFunction, NestedParseFunction, ParsingState } from "../model";

export const markRule: IRule = {
	name: "mark",
	state: ParsingState.INLINE,
	regex: /^={2}([^\n]+)==/,
	parse: (match: RegExpExecArray,
	        parse: NestedParseFunction,
	        state: ParsingState,
	        config: IParserConfig): ISyntaxNode => {
		return {
			content: parse(match[1], state, config),
			rule: markRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		return createHtmlTag("mark", output(node, state));
	}
};
