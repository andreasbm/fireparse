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
import { listItemRule } from "./list-item";
import { mailtoRule } from "./mailto";
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

export const simpleMarkdownRules: Rules = [
	headingRule,
	spanningBlockQuoteRule,
	blockQuoteRule,
	newLineRule,
	blockCodeRule,
	listItemRule,
	imageRule,
	horizontalRulerRule,
	boldRule,
	italicRule,
	mailtoRule,
	delRule,
	linkRule,
	atRule,
	hashtagRule,
	emptyLineRule,
	inlineCodeRule,
	paragraphRule,
	pureTextRule
];
