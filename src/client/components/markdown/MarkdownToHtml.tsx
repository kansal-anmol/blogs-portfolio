import parse, { Element, domToReact } from 'html-react-parser';
import React, { memo, useState } from 'react';
import { markdownToHtml } from './utils/markdownUtils';

type Props = {
	contentMarkdown: string;
};

// Copy button for code blocks
const CopyButton = ({ text }: { text: string }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard.writeText(text).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			});
		} else {
			// Fallback for non-secure contexts / local network IPs
			const textArea = document.createElement('textarea');
			textArea.value = text;
			textArea.style.position = 'fixed';
			textArea.style.opacity = '0';
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (err) {
				console.error('Fallback copy failed', err);
			}
			document.body.removeChild(textArea);
		}
	};

	return (
		<button
			onClick={handleCopy}
			className="copy-btn absolute top-3 right-3 z-10 cursor-pointer rounded-md border border-[#222222] bg-[#161616] px-2.5 py-1 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 hover:border-[#b5f542] hover:text-[#b5f542] focus:outline-none"
		>
			{copied ? '✓ Copied' : 'Copy'}
		</button>
	);
};

// Callout component for admonitions
const Callout = ({ type, children }: { type: string; children: React.ReactNode }) => {
	const icons: Record<string, string> = {
		tip: '💡',
		info: 'ℹ️',
		warning: '⚠️',
		danger: '🚨',
	};

	return (
		<div data-callout={type}>
			<span className="text-md mt-0.5 leading-none select-none">{icons[type] || 'ℹ️'}</span>
			<div className="flex-1 leading-relaxed">{children}</div>
		</div>
	);
};

// Custom wrapper to parse pre blocks and extract code content
const CustomPre = ({ attribs, children }: { attribs: any; children: any }) => {
	const getPreText = (childs: any[]): string => {
		return childs
			.map((c) => {
				if (c.type === 'text') return c.data;
				if (c.children) return getPreText(c.children);
				return '';
			})
			.join('');
	};

	const text = children ? getPreText(Array.isArray(children) ? children : [children]) : '';

	return (
		<div className="group relative my-6 w-full overflow-hidden rounded-xl border border-[#222222] bg-[#0d0d0d]">
			<CopyButton text={text} />
			<pre
				{...attribs}
				className="m-0 overflow-x-auto bg-transparent p-5 text-[0.875rem] leading-[1.7]"
			>
				{children}
			</pre>
		</div>
	);
};

const MarkdownToHtmlComponent = ({ contentMarkdown }: Props) => {
	const content = markdownToHtml(contentMarkdown);
	const parsedContent = parse(content, {
		replace: (domNode) => {
			if (!(domNode instanceof Element)) return;

			// Custom Pre Element with Copy Button
			if (domNode.name === 'pre') {
				return (
					<CustomPre attribs={domNode.attribs}>{domToReact(domNode.children as any)}</CustomPre>
				);
			}

			// Custom Callout tag handler
			if (domNode.name === 'callout') {
				const type = domNode.attribs.type || 'info';
				return <Callout type={type}>{domToReact(domNode.children as any)}</Callout>;
			}

			// Also support callouts parsed as div containers with attribute data-callout
			if (domNode.name === 'div' && domNode.attribs['data-callout']) {
				const type = domNode.attribs['data-callout'];
				return <Callout type={type}>{domToReact(domNode.children as any)}</Callout>;
			}

			// External Links target blank handler
			if (domNode.name === 'a') {
				const href = domNode.attribs.href;
				const isExternal = href?.startsWith('http');
				if (isExternal) {
					return (
						<a href={href} target="_blank" rel="noopener noreferrer" {...domNode.attribs}>
							{domToReact(domNode.children as any)} ↗
						</a>
					);
				}
			}
		},
	});

	return (
		<article className="prose prose-lg dark:prose-invert w-full max-w-none">
			{parsedContent}
		</article>
	);
};

export const MarkdownToHtml = memo(MarkdownToHtmlComponent);
