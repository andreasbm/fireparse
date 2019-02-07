import { simpleMarkdownRules } from "../lib/index";
import { createParser } from "../lib/parser";

const parse = createParser({
	debug: true,
	rules: simpleMarkdownRules
});

const text = `# Hello
## World!

This is cool :-)`;

const $text = document.querySelector<HTMLTextAreaElement>("#text")!;
const $result = document.querySelector("#result")!;

$text.value = text;
render(text);

$text.addEventListener("keyup", e => {
	const value = (<HTMLTextAreaElement>e.target).value;
	render(value);
});

function render (text: string) {
	$result.innerHTML = parse(text);
}



