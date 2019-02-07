import { createHtmlTag } from "../create-html-tag";
import { HTML, IRule, ISyntaxNode, NestedOutputFunction, ParsingState } from "../model";

export const inlineCodeRule: IRule = {
	name: "inline-code",
	state: ParsingState.INLINE,
	regex: /^`([^`\n]+?)`/,
	parse: (match: RegExpExecArray): ISyntaxNode => {
		return {
			content: match[1],
			rule: inlineCodeRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		return createHtmlTag("code", output(node, state));
	}
};
