import { simpleMarkdownRules } from "../lib/index";
import { createParser } from "../lib/parser";

const expect = chai.expect;

const parse = createParser({
	rules: simpleMarkdownRules
});

describe("rules", () => {
	beforeEach(async () => {
	});
	after(() => {
	});

	it("should parse header tags correctly", () => {
		expect(parse("# Hello")).to.equal("<h1>Hello</h1>");
		expect(parse("## Hello")).to.equal("<h2>Hello</h2>");
		expect(parse("### Hello")).to.equal("<h3>Hello</h3>");
		expect(parse("#### Hello")).to.equal("<h4>Hello</h4>");
		expect(parse("##### Hello")).to.equal("<h5>Hello</h5>");
		expect(parse("###### Hello")).to.equal("<h6>Hello</h6>");

		expect(parse("#  Hello")).not.to.equal("<h1>Hello</h1>");
		expect(parse("#  Hello")).not.to.equal("<h1>Hello</h1>");
	});

	it("should parse breaks correctly", () => {
		expect(parse(`\n`)).to.contain("<div class=\"break\"></div>");
		expect(parse(`\n\n`)).to.contain("<div class=\"break\"></div><div class=\"break\"></div>");
		expect(parse(`\n\n\n`))
			.to
			.contain("<div class=\"break\"></div><div class=\"break\"></div><div class=\"break\"></div>");
	});

	it("should parse breaks correctly", () => {
		expect(parse(`\n`)).to.equal("<div class=\"break\"></div>");
		expect(parse(`\n\n`)).to.equal("<div class=\"break\"></div><div class=\"break\"></div>");
		expect(parse(`\n\n\n`))
			.to.equal("<div class=\"break\"></div><div class=\"break\"></div><div class=\"break\"></div>");
	});

	it("should parse paragraphs correctly", () => {
		expect(parse(`hello`)).to.equal("<p>hello</p>");
	});

	it("should parse links correctly", () => {
		expect(parse(`www.google.com`))
			.to
			.contains("<a href=\"http://www.google.com\" target=\"_blank\" class=\"link\">www.google.com</a>");
	});

	it("should parse formatted text correctly", () => {
		expect(parse(`*I am fat*`)).to.equal("<p><b>I am fat</b></p>");
		expect(parse(`_I am italic_`)).to.equal("<p><i>I am italic</i></p>");
		expect(parse(`~I am regretted~`)).to.equal("<p><del>I am regretted</del></p>");

		// Combinations
		expect(parse(`*~Hello~*`)).to.equal("<p><b><del>Hello</del></b></p>");
		expect(parse(`~*Hello*~`)).to.equal("<p><del><b>Hello</b></del></p>");

		// expect(parse(`_*Hello*_`)).to.equal('<p><i><b>Hello</b></i></p>');
		expect(parse(`*_Hello_*`)).to.equal("<p><b><i>Hello</i></b></p>");

		expect(parse(`_~Hello~_`)).to.equal("<p><i><del>Hello</del></i></p>");
		expect(parse(`~_Hello_~`)).to.equal("<p><del><i>Hello</i></del></p>");

		// expect(parse(`~_*Hello*_~`)).to.equal('<p><del><i><b>Hello</b></i></del></p>')

	});

});

