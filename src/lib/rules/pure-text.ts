import { HTML, IRule, ParsingState, ISyntaxNode } from "../model";

export const pureTextRule: IRule = {
	name: "pure-text",
	state: ParsingState.INLINE,
	regex: /^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n| {2,}\n|\w+:\S|$|www\.|http?s:\/\/)/i,
	parse: (match: RegExpExecArray): ISyntaxNode => {
		return {
			content: match[0],
			rule: pureTextRule
		};
	},
	html: (node: ISyntaxNode): HTML => {
		return <string>node.content;
	}
};