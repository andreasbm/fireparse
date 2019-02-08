/**
 * Creates a HTML tag.
 * @param tagName Name of the tag, eg. "a", "p", "blockquote".
 * @param content Content inside the tag.
 * @param attributes Attribute dictionary.
 * @param selfClosing
 * @returns {string}
 */
import { HTML } from "./model";

export function createHtmlTag (tagName: string,
                               content: string | null,
                               attributes: {[key: string]: string;} = {},
                               selfClosing: boolean = false): HTML {

	// Create a string with attributes "key"="value"
	let attributeString = Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(" ");
	if (attributeString.length > 0) {
		attributeString = " " + attributeString;
	}

	// Create an unclosed html tag
	let html = `<${tagName}${attributeString}>`;

	// Close the tag if nessesary
	if (!selfClosing) {
		html += `${content || ""}</${tagName}>`;
	}

	return html;
}

