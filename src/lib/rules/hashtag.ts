import { createHtmlTag } from "../create-html-tag";
import { HTML, IRule, ISyntaxNode, NestedOutputFunction, ParsingState } from "../model";

export const hashtagRule: IRule = {
	name: "hashtag",
	state: ParsingState.INLINE,
	regex: /^#([\d]+)/,
	parse: (match: RegExpExecArray): ISyntaxNode => {
		return {
			content: match[0],
			meta: {
				text: match[1]
			},
			rule: hashtagRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		return createHtmlTag("span", output(node, state));
	}
};
