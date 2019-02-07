import { HTML } from "./model";

/**
 * Removes characters from the string that could potentially be used for HTML injection.
 * @param source
 * @returns {string}
 */
export function sanitize (source: HTML): HTML {
	return source.replace(/&/g, "&amp;")
	             .replace(/</g, "&lt;")
	             .replace(/>/g, "&gt;");
}

/**
 * Replaces the sanitized characters with the corresponding character not sanitized.
 * @param source
 * @returns {string}
 */
export function desanitize (source: HTML): HTML {
	return source.replace(new RegExp("&amp;", "g"), "&")
	             .replace(new RegExp("&lt;", "g"), "<")
	             .replace(new RegExp("&gt;", "g"), ">");
}
