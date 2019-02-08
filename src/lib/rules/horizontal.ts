import { HTML, IRule, ISyntaxNode, ParsingState } from "../model";

export const horizontalRulerRule: IRule = {
	name: "horizontal",
	state: ParsingState.BLOCK,
	regex: /^[-]{3,}(?:\n|$)/,
	parse: (match: RegExpExecArray): ISyntaxNode => {
		return {
			content: match[0],
			rule: horizontalRulerRule
		};
	},
	html: (): HTML => {
		return "<hr />";
	}
};
