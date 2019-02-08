export declare type HTML = string;

export declare type NestedParseFunction = ((source: string,
                                            state: ParsingState,
                                            config: IParserConfig) => SyntaxContent);

export declare type NestedOutputFunction = ((node: ISyntaxNode, state: ParsingState) => HTML);

export declare type ParseFunction = ((match: RegExpExecArray,
                                      parse: NestedParseFunction,
                                      state: ParsingState,
                                      config: IParserConfig) => ISyntaxNode);

export declare type HtmlFunction = ((node: ISyntaxNode, output: NestedOutputFunction, state: ParsingState) => HTML);

export declare type SyntaxContent = ISyntaxNode[] | HTML;

export declare type Rules = IRule[];

export interface IParserConfig {
	rules: Rules;
	initialState: ParsingState;
	allowHtml: boolean;
	debug: boolean;
}

// ==============================
// The parsing state is used to keep track of how deep inside the recursive call we are. Depending on the depth,
// there are some tags we would like to parse and some tags we don't want to parse.
//
// We have two different states "block" and "inline". The outermost state (the whole text) will always be the block state.
// Herafter, the state changes depending on which matches and rules the language is build with.
//
// An example on where this is useful could be the blockquote. The blockquote is a block tag. When we are parsing the blockquote, we
// don't want to suddently parse another block element inside of it (eg. another blockquote). Therefore, everything inside a blockquote is inline elements.
// ==============================
export enum ParsingState {
	INLINE,
	BLOCK,
	ANY
}

// ==============================
// Describes a rule in the parsing process.
// All regexes in the rules have to start from index 0 (^)
// ==============================
export interface IRule {
	name: string,
	state: ParsingState;
	regex: RegExp;
	parse: ParseFunction;
	html: HtmlFunction;
}

// ==============================
// A node in the syntax tree being build from the rules in the initial parsing.
// ==============================
export interface ISyntaxNode<T = any> {
	content: SyntaxContent;
	rule: IRule;
	meta?: T;
}

// ==============================
// Default configuration for the parsing.
// ==============================
export const defaultParserConfig: IParserConfig = {
	rules: [],
	allowHtml: false,
	debug: false,
	initialState: ParsingState.BLOCK
};
