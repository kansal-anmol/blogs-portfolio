import React, { memo, useState } from 'react';
import parse, { Element, domToReact } from 'html-react-parser';
import { useEmbeds } from '@/utils/renderer/hooks/useEmbeds';
import { markdownToHtml } from '@/utils/renderer/markdownToHtml';

type Props = {
	contentMarkdown: string;
};

// Copy button for code blocks
const CopyButton = ({ text }: { text: string }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<button
			onClick={handleCopy}
			className="copy-btn absolute top-3 right-3 text-[10px] bg-[#161616] border border-[#222222] hover:border-[#b5f542] hover:text-[#b5f542] text-neutral-400 px-2.5 py-1 rounded-md transition-all duration-300 focus:outline-none font-semibold cursor-pointer z-10 opacity-0 group-hover:opacity-100 uppercase tracking-wider"
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
			<span className="text-md leading-none mt-0.5 select-none">{icons[type] || 'ℹ️'}</span>
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
		<div className="relative group w-full my-6 overflow-hidden rounded-xl border border-[#222222] bg-[#0d0d0d]">
			<CopyButton text={text} />
			<pre {...attribs} className="m-0 p-5 overflow-x-auto text-[0.875rem] leading-[1.7] bg-transparent">
				{children}
			</pre>
		</div>
	);
};

const MarkdownToHtmlComponent = ({ contentMarkdown }: Props) => {
	const content = markdownToHtml(contentMarkdown);
	useEmbeds({ enabled: true });

	const parsedContent = parse(content, {
		replace: (domNode) => {
			if (!(domNode instanceof Element)) return;

			// Custom Pre Element with Copy Button
			if (domNode.name === 'pre') {
				return (
					<CustomPre attribs={domNode.attribs}>
						{domToReact(domNode.children as any)}
					</CustomPre>
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
		<article className="prose prose-lg dark:prose-invert max-w-none w-full">
			{parsedContent}
		</article>
	);
};

export const MarkdownToHtml = memo(MarkdownToHtmlComponent);
