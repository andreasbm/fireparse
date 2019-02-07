import { createHtmlTag } from "../create-html-tag";
import { HTML, IParserConfig, IRule, ISyntaxNode, NestedOutputFunction, NestedParseFunction, ParsingState } from "../model";

export const listItemRule: IRule = {
	name: "list-item",
	state: ParsingState.BLOCK,
	regex: /^\*\s([^\n]+)\n?/,
	parse: (match: RegExpExecArray,
	        parse: NestedParseFunction,
	        state: ParsingState,
	        config: IParserConfig): ISyntaxNode => {
		return {
			content: parse(match[1], ParsingState.INLINE, config),
			rule: listItemRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction): HTML => {
		return createHtmlTag("p", `• ${output(node, ParsingState.INLINE)}`);
	}
};