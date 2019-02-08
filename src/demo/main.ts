import { rules } from "../lib/index";
import { createParser } from "../lib/parser";

const parse = createParser({
	debug: true,
	rules: rules
});

const text = `# H1 
## H2
### H3
#### H4
##### H5
###### H6
Paragraph

>>> This is a
spanning block quote

> This is a quote

\`\`\`This is
a code block\`\`\`

This is cool :-)

Here is a list
* Item 1
* Item 2
* Item 3

https://i.ytimg.com/vi/a1Tome_eWQQ/maxresdefault.jpg

-------------
==mark==

*bold*
_italic_
*_bold italic_*
_*italic bold*_

example@gmail.com

~delete~

www.google.com

#hashtag
@at

\`inline code\`
`;

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



