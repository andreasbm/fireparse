import { createHtmlTag } from "../create-html-tag";
import { HTML, IParserConfig, IRule, NestedOutputFunction, NestedParseFunction, ParsingState, ISyntaxNode } from "../model";

export const paragraphRule: IRule = {
	name: "paragraph",
	state: ParsingState.BLOCK,
	regex: /^((?:[^\n]|\n(?! *\n))+?)(?:\n|$)/, ///^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
	parse: (match: RegExpExecArray,
	        parse: NestedParseFunction,
	        state: ParsingState,
	        config: IParserConfig): ISyntaxNode => {
		return {
			content: parse(match[1], ParsingState.INLINE, config),
			rule: paragraphRule
		};
	},

	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		return createHtmlTag("p", output(node, state));
	}
};