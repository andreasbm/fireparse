import { createHtmlTag } from "../create-html-tag";
import { HTML, IParserConfig, IRule, ISyntaxNode, NestedOutputFunction, NestedParseFunction, ParsingState } from "../model";

export const boldRule: IRule = {
	name: "bold",
	state: ParsingState.INLINE,
	regex: /^\*([^*\n]+)\*/,
	parse: (match: RegExpExecArray,
	        parse: NestedParseFunction,
	        state: ParsingState,
	        config: IParserConfig): ISyntaxNode => {
		return {
			content: parse(match[1], state, config),
			rule: boldRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		return createHtmlTag("b", output(node, state));
	}
};