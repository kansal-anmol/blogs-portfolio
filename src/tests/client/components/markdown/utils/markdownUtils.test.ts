import { markdownToHtml } from '@/src/client/components/markdown/utils/markdownUtils';
import { describe, expect, it } from 'vitest';

describe('markdownUtils', () => {
	it('converts markdown paragraphs to HTML', () => {
		const md = 'Hello world\n\nThis is a test paragraph.';
		const html = markdownToHtml(md);
		expect(html).toContain('<p>Hello world</p>');
		expect(html).toContain('<p>This is a test paragraph.</p>');
	});

	it('converts headings and creates slug-based IDs', () => {
		const md = '# Header One\n\n## Header Two with spaces and symbols! @';
		const html = markdownToHtml(md);
		expect(html).toContain('<h1 id="header-one">Header One</h1>');
		expect(html).toContain('<h2 id="header-two-with-spaces-and-symbols">Header Two with spaces and symbols! @</h2>');
	});

	it('decorates user mention profile links with special class', () => {
		const md = '[Profile][1]\n\n[1]: https://hashnode.com "anmols Profile - Hashnode"';
		const html = markdownToHtml(md);
		expect(html).toContain('class="user-mention"');
		expect(html).toContain('target="_blank"');
	});

	it('adds post-section-overview class for hash links', () => {
		const md = '[Section](#section-title)';
		const html = markdownToHtml(md);
		expect(html).toContain('class="post-section-overview"');
	});

	it('adds target blank to other external links', () => {
		const md = '[Google](https://google.com)';
		const html = markdownToHtml(md);
		expect(html).toContain('target="_blank"');
	});

	it('converts lists inside table cells split by &lt;br&gt;-', () => {
		const md = '| Head |\n| --- |\n| Cell 1 &lt;br&gt;- Item 1 &lt;br&gt;- Item 2 |';
		const html = markdownToHtml(md);
		expect(html).toContain('<td><ul><li>Cell 1 </li><li> Item 1 </li><li> Item 2</li></ul></td>');
	});

	it('sanitizes unsafe HTML elements', () => {
		const md = 'Unsafe script <script>alert("hack")</script> and safe text.';
		const html = markdownToHtml(md);
		expect(html).not.toContain('<script>');
		expect(html).toContain('Unsafe script  and safe text.');
	});

	it('extracts and formats hashnode mentions', () => {
		const content = 'Hello @<a href="@anmol">Anmol Kansal</a> how are you';
		const html = markdownToHtml(content);
		expect(html).toContain('<a target=\'_blank\' rel=\'noopener noreferrer\' href="https://hashnode.com/@anmol">Anmol Kansal</a>');
	});
});
