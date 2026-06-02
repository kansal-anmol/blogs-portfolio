import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FaDocker, FaGithub, FaLinkedinIn, FaNodeJs, FaReact } from 'react-icons/fa';
import {
	SiCplusplus,
	SiGraphql,
	SiHashnode,
	SiNextdotjs,
	SiPrisma,
	SiTypescript,
} from 'react-icons/si';

import { AppProvider } from '@/components/contexts/appContext';
import { Layout } from '@/components/layout';
import { getAllPosts } from '@/lib/local-blogs';
import { getPublicationData } from '@/lib/local-publication';
import { Post, Publication } from '@/lib/types';

type Props = {
	publication: Publication;
	initialAllPosts: Post[];
};

// Next.js Metadata configuration object (Next.js App Router style equivalent / compliance export)
export const metadata = {
	title: 'Anmol Kansal | Senior Frontend Engineer',
	description:
		'Senior Frontend Engineer specializing in building scalable web apps with React, TypeScript, and Next.js. Architecting premium UI/UX experiences.',
	openGraph: {
		title: 'Anmol Kansal | Senior Frontend Engineer',
		description:
			'Senior Frontend Engineer specializing in building scalable web apps with React, TypeScript, and Next.js. Architecting premium UI/UX experiences.',
		type: 'website',
		url: 'https://anmol-kansal.hashnode.dev',
		images: [
			{
				url: '/assets/profile.jpg',
				width: 800,
				height: 800,
				alt: 'Anmol Kansal',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Anmol Kansal | Senior Frontend Engineer',
		description:
			'Senior Frontend Engineer specializing in building scalable web apps with React, TypeScript, and Next.js. Architecting premium UI/UX experiences.',
		images: ['/assets/profile.jpg'],
	},
};

export default function Index({ publication, initialAllPosts }: Props) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const featuredPosts = initialAllPosts.slice(0, 4);

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

	const skills = [
		{ name: 'React', icon: FaReact },
		{ name: 'TypeScript', icon: SiTypescript },
		{ name: 'Next.js', icon: SiNextdotjs },
		{ name: 'Node.js', icon: FaNodeJs },
		{ name: 'GraphQL', icon: SiGraphql },
		{ name: 'Docker', icon: FaDocker },
		{ name: 'Prisma', icon: SiPrisma },
		{ name: 'C++', icon: SiCplusplus },
	];

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Anmol Kansal',
		jobTitle: 'Senior Frontend Engineer',
		worksFor: {
			'@type': 'Organization',
			name: 'D.E. Shaw',
		},
		url: 'https://anmol-kansal.hashnode.dev',
		image: '/assets/profile.jpg',
		sameAs: socials.map((s) => s.href),
	};

	return (
		<AppProvider publication={publication}>
			<Layout>
				<Head>
					{/* Primary Metadata */}
					<title>{metadata.title}</title>
					<meta name="description" content={metadata.description} />

					{/* Open Graph / Facebook */}
					<meta property="og:type" content={metadata.openGraph.type} />
					<meta property="og:url" content={metadata.openGraph.url} />
					<meta property="og:title" content={metadata.openGraph.title} />
					<meta property="og:description" content={metadata.openGraph.description} />
					<meta property="og:image" content={metadata.openGraph.images[0].url} />

					{/* Twitter */}
					<meta property="twitter:card" content={metadata.twitter.card} />
					<meta property="twitter:url" content={metadata.openGraph.url} />
					<meta property="twitter:title" content={metadata.twitter.title} />
					<meta property="twitter:description" content={metadata.twitter.description} />
					<meta property="twitter:image" content={metadata.twitter.images[0]} />

					{/* JSON-LD Schema */}
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
					/>
				</Head>

				{/* Home Page Outer Container in Dark Mode */}
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
									className="font-heading text-sm font-semibold text-[#b5f542] transition-colors"
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
									className="font-heading text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
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
									className="font-heading py-1 text-sm font-semibold text-[#b5f542]"
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
									className="font-heading py-1 text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
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

					{/* Hero Section */}
					<section className="mx-auto flex max-w-6xl flex-col justify-between gap-12 px-6 pt-20 pb-16 md:flex-row md:items-center md:pt-32 md:pb-24">
						<div className="flex flex-1 flex-col items-start text-left">
							<h1 className="font-heading text-5xl leading-[0.9] font-black tracking-tight text-white select-none sm:text-6xl md:text-8xl">
								Anmol Kansal
							</h1>
							<h2 className="font-heading mt-4 text-lg font-bold tracking-wide text-[#b5f542] uppercase sm:mt-6 sm:text-xl md:text-2xl">
								Senior Frontend Engineer @ D.E. Shaw
							</h2>
							<p className="font-body mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl">
								Designing and building high-performance, visually stunning web experiences.
								Specializing in React, TypeScript, and state-of-the-art UI architectures.
							</p>

							{/* Social Links Row */}
							<div className="mt-8 flex items-center gap-3">
								{socials.map((social) => {
									const Icon = social.icon;
									return (
										<a
											key={social.name}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`Visit my ${social.name}`}
											className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#111111] text-neutral-400 transition-all duration-300 hover:scale-105 hover:border-[#b5f542] hover:text-[#b5f542] hover:shadow-[0_0_15px_rgba(181,245,66,0.15)]"
										>
											<Icon className="h-5 w-5" />
										</a>
									);
								})}
							</div>
						</div>

						{/* Profile Picture Container with premium styling */}
						<div className="group relative mx-auto shrink-0 md:mx-0">
							<div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#b5f542] to-lime-600 opacity-30 blur transition duration-1000 group-hover:opacity-60 group-hover:duration-200"></div>
							<div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-[#222222] shadow-2xl transition-all duration-500 group-hover:border-[#b5f542] sm:h-56 sm:w-56 md:h-64 md:w-64">
								<img
									src="/assets/profile.jpg"
									alt="Anmol Kansal"
									className="h-full w-full scale-102 object-cover transition-all duration-500 group-hover:scale-105"
								/>
							</div>
						</div>
					</section>

					{/* Featured Posts Grid */}
					<section className="mx-auto max-w-6xl border-t border-[#222222] px-6 py-16">
						<div className="mb-8 flex items-center justify-between">
							<h2 className="font-heading text-2xl font-black text-white md:text-3xl">
								Featured Writing
							</h2>
							<span className="rounded bg-[#222222] px-2.5 py-1 text-xs font-semibold tracking-wide text-[#b5f542]">
								LATEST INSIGHTS
							</span>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{featuredPosts.map((post) => {
								const tag = post.tags?.[0]?.name || 'Engineering';
								return (
									<Link
										href={`/blog/${post.slug}`}
										key={post.id}
										className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#222222] bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#b5f542] hover:shadow-[0_8px_30px_rgba(181,245,66,0.06)]"
									>
										<div className="relative h-48 w-full overflow-hidden border-b border-[#222222] bg-neutral-900">
											<img
												src={
													post.coverImage?.url ||
													'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
												}
												alt={post.title}
												className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
											/>
										</div>
										<div className="flex flex-grow flex-col justify-between gap-4 p-5">
											<div className="flex flex-col gap-2">
												<div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
													<span>{formatDate(post.publishedAt)}</span>
													<span className="text-neutral-700">•</span>
													<span>{post.readTimeInMinutes} min read</span>
												</div>
												<h3 className="font-heading line-clamp-2 text-lg leading-snug font-bold text-neutral-100 transition-colors duration-200 group-hover:text-[#b5f542] md:text-xl">
													{post.title}
												</h3>
											</div>
											<div>
												<span className="inline-block rounded-md border border-transparent bg-[#222222] px-2.5 py-1 text-xs font-semibold tracking-wide text-[#b5f542] uppercase transition-all duration-200 group-hover:border-[#b5f542]/20">
													{tag}
												</span>
											</div>
										</div>
									</Link>
								);
							})}
						</div>
					</section>

					{/* Skills Snapshot */}
					<section className="mx-auto max-w-6xl border-t border-[#222222] px-6 py-16">
						<h2 className="font-heading mb-8 text-2xl font-black text-white md:text-3xl">
							Tech Stack
						</h2>

						{/* Scrollable container on mobile, wraps on desktop */}
						<div className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto py-2 md:flex-wrap">
							{skills.map((skill, index) => {
								const Icon = skill.icon;
								return (
									<div
										key={index}
										className="group flex shrink-0 cursor-default snap-center items-center gap-3 rounded-xl border border-[#222222] bg-[#111111] px-5 py-3.5 transition-all duration-300 hover:border-[#b5f542] hover:text-[#b5f542] hover:shadow-[0_0_15px_rgba(181,245,66,0.04)]"
									>
										<Icon className="h-6 w-6 text-neutral-400 transition-colors duration-300 group-hover:text-[#b5f542]" />
										<span className="font-heading text-sm font-semibold text-neutral-200 transition-colors duration-300 group-hover:text-white">
											{skill.name}
										</span>
									</div>
								);
							})}
						</div>
					</section>

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
	const initialAllPosts = await getAllPosts();

	return {
		props: {
			publication,
			initialAllPosts,
		},
		revalidate: 60,
	};
};
