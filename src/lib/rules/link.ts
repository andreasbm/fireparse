import { createHtmlTag } from "../create-html-tag";
import { HTML, IRule, ISyntaxNode, NestedOutputFunction, ParsingState } from "../model";

// ==============================
// Image
// ==============================
export function imageHTMLTransform (href: string,
                                    node: ISyntaxNode,
                                    output: NestedOutputFunction,
                                    state: ParsingState): HTML | null {
	const isImage = /(\.png|\.jpg|\.jpeg|\.gif)$/.test(href);
	if (!isImage) {
		return null;
	}

	const imgAttributes: any = {
		"src": href,
		"style": `max-width: 200px`,
		"display": (state === ParsingState.BLOCK) ? "block" : "inline-block"
	};
	return createHtmlTag("img", null, imgAttributes, true);
}

// ==============================
// Youtube
// ==============================
export function youtubeHTMLTransform (href: string): HTML | null {
	const youtubeMatch = /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com|youtu.be)\/(?:[\w\-]+\?v=|embed\/|v\/)?([\w\-]+)\S*/.exec(href);
	if (youtubeMatch == null) {
		return null;
	}

	const youtubeId = youtubeMatch[1];
	const src = `https://www.youtube.com/embed/${youtubeId}`;
	const settings = "autoplay=0&cc_load_policy&amp;controls=0amp;iv_load_policy=3&amp;modestbranding=1&amp;&amp;rel=0&amp;showinfo=0&amp;wmode=transparent&amp;enablejsapi=1&amp;widgetid=1";

	const youtubeAttributes: any = {
		"type": "text/html",
		"width": "100%",
		"height": "200px",
		"style": "border: 1px solid lightgray; max-width: 400px;",
		"class": "line gray-bg",
		"src": `${src}?&${settings}`,
		"frameborder": "0",
		"allowfullscreen": "1"
	};

	return createHtmlTag("iframe", "", youtubeAttributes);
}

// ==============================
// Soundcloud
// ==============================
export function soundcloudHTMLTransform (href: string): HTML | null {
	const isSoundcloud = /(?:soundcloud\.com\/|snd\.sc\/)([\w\d-]+)\/([\w\d-]+)/i.test(href);
	if (!isSoundcloud) {
		return null;
	}

	const src = `https://w.soundcloud.com/player/?url=${href}&amp`;
	const settings = `autoplay=false?frameborder=0`;

	const soundcloundAttributes: any = {
		"type": "text/html",
		"width": "100%",
		"height": "100px",
		"style": "border: 1px solid lightgray; max-width: 500px;",
		"class": "line gray-bg",
		"src": `${src}${settings}`,
		"frameborder": "0",
		"scrolling": "no"
	};

	return createHtmlTag("iframe", "", soundcloundAttributes);
}

// ==============================
// Vimeo
// ==============================
export function vimeoHTMLTransform (href: string): HTML | null {
	const vimeoMatch = /(?:vimeo\.com\/)([\d]+)/i.exec(href);
	if (vimeoMatch == null) {
		return null;
	}

	const vimeoId = vimeoMatch[1];
	const src = `https://player.vimeo.com/video/${vimeoId}`;
	const settings = `frameborder=0&color=e0b631&title=0&byline=0&portrait=0`;

	const vimeoAttributes: any = {
		"type": "text/html",
		"width": "100%",
		"height": "200px",
		"style": "border: 1px solid lightgray; max-width: 400px;",
		"class": "line gray-bg",
		"src": `${src}?${settings}`,
		"frameborder": "0",
		"webkitallowfullscreen": "1",
		"allowfullscreen": "1",
		"mozallowfullscreen": "1"
	};

	return createHtmlTag("iframe", "", vimeoAttributes);
}

// ==============================
// Link
// ==============================
export function linkHTMLTransform (href: string, node: ISyntaxNode): HTML {
	const hrefAttributes: {[key: string]: string} = {
		"href": href,
		"target": "_blank",
		"class": "link"
	};

	return createHtmlTag("a", <string>node.content, hrefAttributes);
}

export interface ILinkRule extends IRule {
	htmlTransformers: ((href: string,
	                    node: ISyntaxNode,
	                    output: NestedOutputFunction,
	                    state: ParsingState) => HTML | null)[];
}

export const linkRule: ILinkRule = {
	name: "link",
	state: ParsingState.INLINE,
	regex: /^(([\w-]+:\/\/?|www[.])[\S]+(?:\([\w\d\S]+\)|(?:[^\.\s]|\/)))/i, // /^((https?:\/\/|www\.|https?:\/\/www\.)[\S]+)/i,
	parse: (match: RegExpExecArray): ISyntaxNode => {
		return {
			content: match[1],
			meta: {
				url: match[1],
				protocol: match[2]
			},
			rule: linkRule
		};
	},
	htmlTransformers: [
		imageHTMLTransform,
		youtubeHTMLTransform,
		soundcloudHTMLTransform,
		vimeoHTMLTransform,
		linkHTMLTransform
	],
	html: (node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState): HTML => {
		const href = ((node.meta.protocol.indexOf("www") > -1) ? "http://" : "") + node.meta.url;
		for (const transform of ((<ILinkRule>node.rule).htmlTransformers || [])) {
			const content = transform(href, node, output, state);
			if (content != null) {
				return content;
			}
		}

		return <string>node.content;
	}
};
