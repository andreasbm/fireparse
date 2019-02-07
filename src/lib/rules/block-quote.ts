import { createHtmlTag } from "../create-html-tag";
import { HTML, IParserConfig, IRule, ISyntaxNode, NestedOutputFunction, NestedParseFunction, ParsingState } from "../model";

export const blockQuoteRule: IRule = {
	name: "block-quote",
	state: ParsingState.BLOCK,
	regex: /^(?:&gt;|>)\s*([\s\S]+?)(?:\n|$)/,
	parse: (match: RegExpExecArray,
	        parse: NestedParseFunction,
	        state: ParsingState,
	        config: IParserConfig): ISyntaxNode => {
		return {
			content: parse(match[1], ParsingState.INLINE, config),
			rule: blockQuoteRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction): HTML => {
		return createHtmlTag("blockquote", output(node, ParsingState.INLINE));
	}
};
