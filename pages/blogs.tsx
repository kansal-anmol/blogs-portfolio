import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getAllBlogs } from '@/lib/local-blogs';
import { BlogGrid } from '@/src/client/components/blogGrid';
import { Post as Blog } from '@/src/shared/types';

type Props = {
	blogs: Blog[];
};

// Next.js Metadata configuration object (Next.js App Router style equivalent / compliance export)
export const metadata = {
	title: 'Blog — Anmol Kansal',
	description:
		'Articles on TypeScript, React, Next.js, and frontend engineering. Written by Anmol Kansal.',
	openGraph: {
		title: 'Blog — Anmol Kansal',
		description: 'Articles on TypeScript, React, Next.js, and frontend engineering.',
		url: 'https://www.anmolkansal.in/blogs',
	},
	alternates: {
		canonical: 'https://www.anmolkansal.in/blogs',
	},
};

export default function BlogsPage({ blogs }: Props) {
	return (
		<>
			<Head>
				{/* SEO Head Tags */}
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />

				{/* Open Graph */}
				<meta property="og:title" content={metadata.openGraph.title} />
				<meta property="og:description" content={metadata.openGraph.description} />
				<meta property="og:url" content={metadata.openGraph.url} />
				<link rel="canonical" href={metadata.alternates.canonical} />
			</Head>

			{/* Blogs Page Outer Container in Dark Mode */}
			<div className="dark font-body min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-[#b5f542]/20 selection:text-[#b5f542]">
				{/* Main Blogs Layout Container */}
				<main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
					{/* Header Text Section */}
					<div className="flex flex-col gap-3">
						<h1 className="font-heading text-4xl leading-none font-black tracking-tight text-white md:text-5xl">
							Blog
						</h1>
						<p className="font-body max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
							Thoughts on TypeScript, React, and the web.
						</p>
					</div>

					{/* Client-side Blogs Grid Component */}
					<BlogGrid blogs={blogs} />
				</main>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const blogs = await getAllBlogs();

	return {
		props: {
			blogs,
		},
		revalidate: 60,
	};
};
