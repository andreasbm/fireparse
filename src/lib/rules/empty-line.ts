import { HTML, IRule, ParsingState, ISyntaxNode } from "../model";

export const emptyLineRule: IRule = {
	name: "empty-line",
	state: ParsingState.ANY,
	regex: /^\s*\n$/,
	parse: (): ISyntaxNode => {
		return {
			content: "",
			rule: emptyLineRule
		};
	},

	html: (): HTML => {
		return "<div class=\"break\"></div>";
	}
};