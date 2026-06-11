import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkdownToHtml } from '@/src/client/components/markdown/MarkdownToHtml';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

// Mock markdownToHtml to return expected HTML outputs directly and avoid require('./highlight') crash
vi.mock('@/src/client/components/markdown/utils/markdownUtils', () => ({
	markdownToHtml: vi.fn().mockImplementation((md: string) => {
		if (md.includes('```')) {
			// Return HTML structure that the component expects for code blocks
			return '<pre><code>const x = 5;\nconsole.log(x);\n</code></pre>';
		}
		if (md.includes('data-callout')) {
			return md; // Pass HTML through directly for callout parsing
		}
		if (md.includes('Google')) {
			return '<p><a href="https://google.com">Google</a></p>';
		}
		return '<p>Hello <strong>world</strong></p>';
	}),
}));

describe('MarkdownToHtml', () => {
	const originalClipboard = navigator.clipboard;
	const originalExecCommand = document.execCommand;

	beforeEach(() => {
		// Mock clipboard
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: vi.fn().mockResolvedValue(undefined),
			},
			writable: true,
			configurable: true,
		});
		Object.defineProperty(window, 'isSecureContext', {
			value: true,
			writable: true,
			configurable: true,
		});
		document.execCommand = vi.fn();
	});

	afterEach(() => {
		Object.defineProperty(navigator, 'clipboard', {
			value: originalClipboard,
			writable: true,
			configurable: true,
		});
		document.execCommand = originalExecCommand;
	});

	it('renders markdown text correctly', () => {
		render(<MarkdownToHtml contentMarkdown="Hello **world**" />);
		const strongElement = screen.getByText('world');
		expect(strongElement.tagName).toBe('STRONG');
		expect(screen.getByText(/Hello/)).toBeInTheDocument();
	});

	it('renders custom Callout component for tip and warning type callouts', () => {
		const md = '<div data-callout="tip">This is a tip</div>\n\n<div data-callout="warning">This is a warning</div>';
		render(<MarkdownToHtml contentMarkdown={md} />);

		expect(screen.getByText('💡')).toBeInTheDocument();
		expect(screen.getByText('This is a tip')).toBeInTheDocument();

		expect(screen.getByText('⚠️')).toBeInTheDocument();
		expect(screen.getByText('This is a warning')).toBeInTheDocument();
	});

	it('renders code blocks inside pre with a functional Copy button', async () => {
		const user = userEvent.setup();

		const writeTextSpy = vi.fn().mockResolvedValue(undefined);
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: writeTextSpy,
			},
			configurable: true,
			writable: true,
		});

		const md = '```javascript\nconst x = 5;\nconsole.log(x);\n```';
		render(<MarkdownToHtml contentMarkdown={md} />);

		// Verify pre is rendered
		const codeBlock = screen.getByText((content, element) => {
			return element?.tagName === 'CODE' && content.includes('const x = 5;');
		});
		expect(codeBlock).toBeInTheDocument();

		// Copy button
		const copyBtn = screen.getByRole('button', { name: 'Copy' });
		expect(copyBtn).toBeInTheDocument();

		// Click copy button
		await user.click(copyBtn);

		// Should write code content to clipboard
		expect(writeTextSpy).toHaveBeenCalledWith('const x = 5;\nconsole.log(x);\n');

		// Check copy success state label change
		await waitFor(() => {
			expect(screen.getByRole('button', { name: '✓ Copied' })).toBeInTheDocument();
		});
	});

	it('falls back to document.execCommand when clipboard API is unavailable', async () => {
		const user = userEvent.setup();
		// Set clipboard API to undefined
		Object.defineProperty(navigator, 'clipboard', {
			value: undefined,
			configurable: true,
		});

		const md = '```\ntest code\n```';
		render(<MarkdownToHtml contentMarkdown={md} />);

		const copyBtn = screen.getByRole('button', { name: 'Copy' });
		await user.click(copyBtn);

		expect(document.execCommand).toHaveBeenCalledWith('copy');
		await waitFor(() => {
			expect(screen.getByRole('button', { name: '✓ Copied' })).toBeInTheDocument();
		});
	});

	it('decorates external links with target="_blank" and an arrow symbol', () => {
		render(<MarkdownToHtml contentMarkdown="Check out [Google](https://google.com)" />);
		const link = screen.getByRole('link', { name: /Google/i });
		expect(link).toHaveAttribute('href', 'https://google.com');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveTextContent('Google ↗');
	});
});
