import { createHtmlTag } from "../create-html-tag";
import { HTML, IParserConfig, IRule, ISyntaxNode, NestedOutputFunction, NestedParseFunction, ParsingState } from "../model";

export const spanningBlockQuoteRule: IRule = {
	name: "spanning-block-quote",
	state: ParsingState.BLOCK,
	regex: /^(?:&gt;&gt;&gt;|>>>)\s*([\s\S\n]+?)(?:\n\n|$)/,
	parse: (match: RegExpExecArray, parse: NestedParseFunction, state: ParsingState, config: IParserConfig): ISyntaxNode => {
		return {
			content: parse(match[1], ParsingState.INLINE, config),
			rule: spanningBlockQuoteRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		return createHtmlTag("blockquote", output(node, ParsingState.INLINE));
	}
};