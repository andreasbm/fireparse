import { createHtmlTag } from "../create-html-tag";
import { HTML, IParserConfig, IRule, ISyntaxNode, NestedOutputFunction, NestedParseFunction, ParsingState } from "../model";

export const italicRule: IRule = {
	name: "italic",
	state: ParsingState.INLINE,
	regex: /^_([^*\n]+)_/,
	parse: (match: RegExpExecArray, parse: NestedParseFunction, state: ParsingState, config: IParserConfig): ISyntaxNode => {
		return {
			content: parse(match[1], state, config),
			rule: italicRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		return createHtmlTag("i", output(node, state));
	}
}
