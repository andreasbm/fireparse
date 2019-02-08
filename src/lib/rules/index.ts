import { Rules } from "../model";
import { atRule } from "./at";
import { blockCodeRule } from "./block-code";
import { blockQuoteRule } from "./block-quote";
import { boldRule } from "./bold";
import { delRule } from "./del";
import { emptyLineRule } from "./empty-line";
import { hashtagRule } from "./hashtag";
import { headingRule } from "./heading";
import { horizontalRulerRule } from "./horizontal";
import { imageRule } from "./image";
import { inlineCodeRule } from "./inline-code";
import { italicRule } from "./italic";
import { linkRule } from "./link";
import { listRule } from "./list";
import { listItemRule } from "./list-item";
import { mailtoRule } from "./mailto";
import { markRule } from "./mark";
import { newLineRule } from "./new-line";
import { paragraphRule } from "./paragraph";
import { pureTextRule } from "./pure-text";
import { spanningBlockQuoteRule } from "./spanning-block-quote";

export * from "../model";
export * from "./at";
export * from "./block-code";
export * from "./block-quote";
export * from "./bold";
export * from "./del";
export * from "./empty-line";
export * from "./hashtag";
export * from "./heading";
export * from "./horizontal";
export * from "./image";
export * from "./inline-code";
export * from "./italic";
export * from "./link";
export * from "./list-item";
export * from "./mailto";
export * from "./new-line";
export * from "./paragraph";
export * from "./pure-text";
export * from "./spanning-block-quote";

const inlineRules: Rules = [
	italicRule,             // _italic_
	boldRule,               // *bold*
	listItemRule,           // * list item
	mailtoRule,             // example@gmail.com
	markRule,               // ==mark==
	delRule,                // ~delete~
	linkRule,               // www.google.com
	atRule,                 // @tag
	hashtagRule,            // #hashtag
	emptyLineRule,          // ^[\n|$]
	inlineCodeRule,         // `code`
	pureTextRule
];

const blockRules: Rules = [
	headingRule,            // # heading
	spanningBlockQuoteRule, // >>> block quote\nblock quote
	blockQuoteRule,         // > block quote
	newLineRule,
	blockCodeRule,          // ```code```
	imageRule,
	horizontalRulerRule,    // -----
	listRule,
	paragraphRule,
];


export const rules: Rules = [
	...inlineRules,
	...blockRules
];

// export const rules: Rules = [
// 	headingRule,            // # heading
// 	spanningBlockQuoteRule, // >>> block quote\nblock quote
// 	blockQuoteRule,         // > block quote
// 	newLineRule,
// 	blockCodeRule,          // ```code```
// 	imageRule,
// 	horizontalRulerRule,    // -----
// 	italicRule,             // _italic_
// 	boldRule,               // *bold*
// 	listItemRule,           // * list item
// 	mailtoRule,             // example@gmail.com
// 	delRule,                // ~delete~
// 	linkRule,               // www.google.com
// 	atRule,                 // @tag
// 	hashtagRule,            // #hashtag
// 	emptyLineRule,          // ^[\n|$]
// 	inlineCodeRule,         // `code`
// 	listRule,
// 	paragraphRule,
// 	pureTextRule
// ];
