import { createHtmlTag } from "../create-html-tag";
import { HTML, IParserConfig, IRule, ISyntaxNode, NestedOutputFunction, NestedParseFunction, ParsingState } from "../model";

export const listRule: IRule = {
	name: "list",
	state: ParsingState.BLOCK,
	regex: /^(\*\s*[^\n]+\n?)+/,
	parse: (match: RegExpExecArray,
	        parse: NestedParseFunction,
	        state: ParsingState,
	        config: IParserConfig): ISyntaxNode => {
		console.log("!!!!!!!!!!!!!", match);
		return {
			content: parse(match[0], ParsingState.INLINE, config),
			rule: listRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction): HTML => {
		return createHtmlTag("ul", `${output(node, ParsingState.INLINE)}`);
	}
};