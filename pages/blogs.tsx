import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';

import { BlogGrid } from '@/components/blogs/BlogGrid';
import { AppProvider } from '@/components/contexts/appContext';
import { Layout } from '@/components/layout';
import { getAllPosts } from '@/lib/local-blogs';
import { getPublicationData } from '@/lib/local-publication';
import { Post, Publication } from '@/lib/types';

type Props = {
	publication: Publication;
	posts: Post[];
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

export default function BlogsPage({ publication, posts }: Props) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const socials = [
		{
			name: 'GitHub',
			href: publication.links?.github || 'https://github.com/kansal-anmol',
			icon: FaGithub,
		},
		{
			name: 'LinkedIn',
			href: publication.links?.linkedin || 'https://www.linkedin.com/in/kansal-anmol/',
			icon: FaLinkedinIn,
		},
		{
			name: 'Hashnode',
			href: publication.links?.hashnode || 'https://hashnode.com/@kansalanmol0609',
			icon: SiHashnode,
		},
	];

	return (
		<AppProvider publication={publication}>
			<Layout>
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
					{/* Navbar */}
					<nav className="sticky top-0 z-50 border-b border-[#222222] bg-[#0a0a0a]/80 backdrop-blur-md">
						<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
							{/* Logo / Monogram */}
							<Link href="/" className="group flex items-center gap-2">
								<div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-[#222222] transition-all duration-300 group-hover:border-[#b5f542] group-hover:shadow-[0_0_10px_rgba(181,245,66,0.15)]">
									<img
										src="/assets/profile.jpg"
										alt="Anmol Kansal"
										className="h-full w-full object-cover"
									/>
								</div>
							</Link>

							{/* Desktop Nav Links */}
							<div className="hidden items-center gap-8 md:flex">
								<Link
									href="/"
									className="font-heading text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
								>
									Home
								</Link>
								<Link
									href="/about"
									className="font-heading text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
								>
									About
								</Link>
								<Link
									href="/blogs"
									className="font-heading text-sm font-semibold text-[#b5f542] transition-colors"
								>
									Blog
								</Link>
								<Link
									href="/terminal"
									className="font-heading text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
								>
									Terminal
								</Link>
							</div>

							{/* Mobile Hamburger Button */}
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="p-2 text-neutral-400 hover:text-[#b5f542] focus:outline-none md:hidden"
								aria-label="Toggle Menu"
							>
								{isMobileMenuOpen ? (
									<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								) : (
									<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								)}
							</button>
						</div>

						{/* Mobile Nav Menu */}
						{isMobileMenuOpen && (
							<div className="flex flex-col gap-4 border-b border-[#222222] bg-[#0a0a0a] px-6 py-4 md:hidden">
								<Link
									href="/"
									onClick={() => setIsMobileMenuOpen(false)}
									className="font-heading py-1 text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
								>
									Home
								</Link>
								<Link
									href="/about"
									onClick={() => setIsMobileMenuOpen(false)}
									className="font-heading py-1 text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
								>
									About
								</Link>
								<Link
									href="/blogs"
									onClick={() => setIsMobileMenuOpen(false)}
									className="font-heading py-1 text-sm font-semibold text-[#b5f542]"
								>
									Blog
								</Link>
								<Link
									href="/terminal"
									onClick={() => setIsMobileMenuOpen(false)}
									className="font-heading py-1 text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
								>
									Terminal
								</Link>
							</div>
						)}
					</nav>

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

						{/* Client-side Posts Grid Component */}
						<BlogGrid posts={posts} />
					</main>

					{/* Footer */}
					<footer className="border-t border-[#222222] bg-[#0a0a0a] py-12">
						<div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-6">
							<div className="flex items-center gap-4">
								{socials.map((social) => {
									const Icon = social.icon;
									return (
										<a
											key={social.name}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`Visit my ${social.name}`}
											className="text-neutral-500 transition-colors duration-300 hover:text-[#b5f542]"
										>
											<Icon className="h-5 w-5" />
										</a>
									);
								})}
							</div>
							<p className="font-heading text-sm font-medium text-neutral-500">
								© 2025 Anmol Kansal
							</p>
						</div>
					</footer>
				</div>
			</Layout>
		</AppProvider>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const publication = getPublicationData();
	const posts = await getAllPosts();

	return {
		props: {
			publication,
			posts,
		},
		revalidate: 60,
	};
};
