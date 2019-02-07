import { createHtmlTag } from "../create-html-tag";
import { HTML, IRule, ISyntaxNode, NestedOutputFunction, ParsingState } from "../model";

export const imageRule: IRule = {
	name: "image",
	state: ParsingState.ANY,
	regex: /^!\[([^\]]*)\]\(([\S]+)(?:\s+=([\d]*)x([\d]*))?\)/,
	parse: (match: RegExpExecArray): ISyntaxNode => {
		return {
			content: match[0],
			meta: {
				name: match[1],
				src: match[2],
				width: +match[3],
				height: +match[4]
			},
			rule: imageRule
		};
	},
	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		let attributes: any = {
			"alt": node.meta.name,
			"src": node.meta.src,
			// 'style': `width: ${node.meta.width || 'auto'} height: ${node.meta.height || 'auto'}`,
			"width": node.meta.width || "auto",
			"height": node.meta.height || "auto",
			"display": (state === ParsingState.BLOCK) ? "block" : "inline-block"
		};

		return createHtmlTag("img", null, attributes, true);
	}
};
