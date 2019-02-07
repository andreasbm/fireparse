import { createHtmlTag } from "../create-html-tag";
import { HTML, IRule, ISyntaxNode, NestedOutputFunction, ParsingState } from "../model";

export const blockCodeRule: IRule = {
	name: "block-code",
	state: ParsingState.BLOCK,
	regex: /^```(\n\s)*([^`]+?)```\n?/,
	parse: (match: RegExpExecArray): ISyntaxNode => {
		return {
			content: match[2],
			rule: blockCodeRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction): HTML => {
		return createHtmlTag("pre", output(node, ParsingState.INLINE));
	}
};