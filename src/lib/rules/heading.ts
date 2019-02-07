import { createHtmlTag } from "../create-html-tag";
import { HTML, IParserConfig, IRule, NestedOutputFunction, NestedParseFunction, ParsingState, ISyntaxNode } from "../model";



export const headingRule: IRule = {
	name: "heading",
	state: ParsingState.BLOCK,
	regex: /^ *(#{1,6}) ([^]+?)(?:$|\n)/,
	parse: (match: RegExpExecArray, parse: NestedParseFunction, state: ParsingState, config: IParserConfig): ISyntaxNode => {
		return {
			content: parse(match[2], ParsingState.INLINE, config),
			meta: {
				level: match[1].length
			},
			rule: headingRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction): HTML => {
		return createHtmlTag(`h${node.meta.level}`, output(node, ParsingState.INLINE));
	}
};
