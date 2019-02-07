import { createHtmlTag } from "../create-html-tag";
import { HTML, IRule, ISyntaxNode, NestedOutputFunction, ParsingState } from "../model";

export const atRule: IRule = {
	name: "at",
	state: ParsingState.INLINE,
	regex: /^@([\w\d\-_]+)/,
	parse: (match: RegExpExecArray): ISyntaxNode => {
		return {
			content: match[0],
			meta: {
				text: match[1]
			},
			rule: atRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		return createHtmlTag("span", output(node, state));
	}
};
