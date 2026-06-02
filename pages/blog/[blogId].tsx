// Libs
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

// Components
import { AuthorCard } from '@/src/client/components/blog/AuthorCard';
import { BlogHeader } from '@/src/client/components/blog/BlogHeader';
import { ReadingProgressBar } from '@/src/client/components/blog/ReadingProgressBar';
import { RelatedBlogs } from '@/src/client/components/blog/RelatedBlogs';
import { TableOfContents } from '@/src/client/components/blog/TableOfContents';
import { TagsRow } from '@/src/client/components/blog/TagsRow';
import { Container } from '@/src/client/components/Container';
import { MarkdownToHtml } from '@/src/client/components/markdown/MarkdownToHtml';

// Data
import { getAllBlogs, getPostBySlug } from '@/lib/local-blogs';

// Types
import type { Post as Blog, StaticPage } from '@/lib/types';

type BlogProps = {
	type: 'blog';
	blog: Blog;
	relatedBlogs: Blog[];
};

type PageProps = {
	type: 'page';
	page: StaticPage;
};

type Props = BlogProps | PageProps;

const formatDate = (dateStr: string) =>
	new Date(dateStr).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

const highlightJsMonokaiTheme =
	'.hljs{display:block;overflow-x:auto;padding:.5em;background:#23241f}.hljs,.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-builtin-name,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}';

// Main Blog Page Component
const BlogComponent = ({ blog, relatedBlogs }: BlogProps) => {
	const router = useRouter();
	const [activeHeadingId, setActiveHeadingId] = useState('');
	const [progress, setProgress] = useState(0);

	const articleRef = useRef<HTMLDivElement>(null);

	// Performance scaleX scroll progress tracker
	useEffect(() => {
		const handleScroll = () => {
			if (!articleRef.current) return;

			const rect = articleRef.current.getBoundingClientRect();
			const elementHeight = rect.height;
			const scrollPos = -rect.top;
			const windowHeight = window.innerHeight;

			const totalScrollable = elementHeight - windowHeight;

			if (totalScrollable <= 0) {
				setProgress(0);
				return;
			}

			let pct = scrollPos / totalScrollable;
			if (pct < 0) pct = 0;
			if (pct > 1) pct = 1;
			setProgress(pct);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, [blog]);

	// Highlight current reading heading inside Table of Contents
	useEffect(() => {
		const handleObserver = (entries: any) => {
			const activeEntry = entries.find((entry: any) => entry.isIntersecting);
			if (activeEntry) {
				setActiveHeadingId(activeEntry.target.id);
			}
		};

		const observer = new IntersectionObserver(handleObserver, {
			root: null,
			rootMargin: '0px 0px -60% 0px',
			threshold: 0.1,
		});

		const tocItems = blog.features?.tableOfContents?.items;
		if (tocItems && tocItems.length > 0) {
			tocItems.forEach((item: any) => {
				const headingEl = document.getElementById(item.slug);
				if (headingEl) {
					observer.observe(headingEl);
				}
			});
		}

		return () => {
			observer.disconnect();
		};
	}, [blog]);

	const tocItems = blog.features?.tableOfContents?.items || [];

	return (
		<>
			<Head>
				<title>{blog.seo?.title || blog.title} — Anmol Kansal</title>
				<link rel="canonical" href={blog.url || undefined} />
				<meta name="description" content={blog.seo?.description || blog.subtitle || blog.brief} />

				<meta property="twitter:title" content={blog.seo?.title || blog.title} />
				<meta
					property="twitter:description"
					content={blog.seo?.description || blog.subtitle || blog.brief}
				/>

				<style dangerouslySetInnerHTML={{ __html: highlightJsMonokaiTheme }}></style>
			</Head>

			<ReadingProgressBar progress={progress} />

			{/* Main Article Block */}
			<div className="w-full">
				<BlogHeader blog={blog} formatDate={formatDate} />

				{/* Two-Column split container */}
				<div className="relative mt-6 flex w-full flex-col items-start gap-12 lg:flex-row">
					{/* Left Content Column */}
					<div ref={articleRef} className="w-full max-w-2xl flex-1">
						<div className="prose prose-invert prose-custom max-w-none break-words">
							<MarkdownToHtml contentMarkdown={blog.content?.markdown || ''} />
						</div>

						{/* Inline tags block */}
						<TagsRow
							tags={blog.tags}
							onClick={(tag) => router.push(`/blogs?tag=${encodeURIComponent(tag.name)}`)}
						/>
					</div>

					<TableOfContents items={tocItems} activeHeadingId={activeHeadingId} />
				</div>

				<AuthorCard />

				<RelatedBlogs blogs={relatedBlogs} />
			</div>
		</>
	);
};

export default function BlogPage(props: Props) {
	return (
		<div className="dark font-body min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-[#b5f542]/20 selection:text-[#b5f542]">
			<Container className="mx-auto max-w-4xl px-6 pt-10">
				<article className="flex flex-col items-start gap-10 pb-20">
					{props.type === 'blog' && <BlogComponent {...props} />}
				</article>
			</Container>
		</div>
	);
}

type Params = {
	blogId: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	if (!params) {
		throw new Error('No params');
	}

	const blogId = params.blogId;
	const blog = await getPostBySlug(blogId);

	if (blog) {
		const allBlogs = await getAllBlogs();

		// Related blogs: match tags
		const blogTagsSet = new Set(blog.tags?.map((t) => t.name.toLowerCase()) || []);
		let related = allBlogs.filter(
			(b) => b.id !== blog.id && b.tags?.some((t) => blogTagsSet.has(t.name.toLowerCase())),
		);

		// Fallback to latest blogs if fewer than 3
		if (related.length < 3) {
			const ids = new Set(related.map((b) => b.id));
			const fallbacks = allBlogs.filter((b) => b.id !== blog.id && !ids.has(b.id));
			related = [...related, ...fallbacks].slice(0, 3);
		} else {
			related = related.slice(0, 3);
		}

		return {
			props: {
				type: 'blog',
				blog,
				relatedBlogs: related,
			},
			revalidate: 60,
		};
	}

	return {
		notFound: true,
		revalidate: 60,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const blogs = await getAllBlogs();

	return {
		paths: blogs.map((blog) => {
			return {
				params: {
					blogId: blog.slug,
				},
			};
		}),
		fallback: 'blocking',
	};
};
