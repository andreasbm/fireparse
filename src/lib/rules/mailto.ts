import { createHtmlTag } from "../create-html-tag";
import { HTML, IRule, ISyntaxNode, ParsingState } from "../model";

export const mailtoRule: IRule = {
	name: "mailto",
	state: ParsingState.INLINE,
	regex: /^([\S]+@[\S]+)/,
	parse: (match: RegExpExecArray): ISyntaxNode => {
		return {
			content: match[1],
			meta: {
				email: match[1]
			},
			rule: mailtoRule
		};
	},
	html: (node: ISyntaxNode): HTML => {
		let attributes: any = {
			"href": `mailto:${node.meta.email}`,
			"target": "_blank",
			"class": "link"
		};
		return createHtmlTag("a", <string>node.content, attributes);
	}
};
