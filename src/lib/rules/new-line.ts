import { createHtmlTag } from "../create-html-tag";
import { HTML, IRule, ISyntaxNode, ParsingState } from "../model";

export const newLineRule: IRule = {
	name: "new-line",
	state: ParsingState.ANY,
	regex: /^\n/,

	parse: (): ISyntaxNode => {
		return {
			content: "",
			rule: newLineRule
		};
	},

	html: (): HTML => {
		return createHtmlTag("div", "", {
			"class": "break"
		});
	}
};