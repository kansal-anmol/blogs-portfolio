import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getAllBlogs } from '@/lib/local-blogs';
import { Post as Blog } from '@/lib/types';
import { BlogCard } from '@/src/client/components/BlogCard';
import { SOCIALS } from '@/src/client/constants/social';
import { USER } from '@/src/shared/constants/user';

type Props = {
	initialAllBlogs: Blog[];
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

export default function Index({ initialAllBlogs }: Props) {
	const skills = USER.skillGroups.flatMap((group) => group.skills).slice(0, 8);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: USER.name,
		jobTitle: USER.role,
		worksFor: {
			'@type': 'Organization',
			name: USER.company,
		},
		url: 'https://anmol-kansal.hashnode.dev',
		image: '/assets/profile.jpg',
		sameAs: SOCIALS.map((s) => s.href),
	};

	return (
		<>
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
			<div className="dark font-body bg-[#0a0a0a] text-neutral-100 selection:bg-[#b5f542]/20 selection:text-[#b5f542]">
				{/* Hero Section */}
				<section className="mx-auto flex max-w-6xl flex-col justify-between gap-12 px-6 pt-20 pb-16 md:flex-row md:items-center md:pt-32 md:pb-24">
					<div className="flex flex-1 flex-col items-start text-left">
						<h1 className="font-heading text-5xl leading-[0.9] font-black tracking-tight text-white select-none sm:text-6xl md:text-8xl">
							{USER.name}
						</h1>
						<h2 className="font-heading mt-4 text-lg font-bold tracking-wide text-[#b5f542] uppercase sm:mt-6 sm:text-xl md:text-2xl">
							{USER.role} @ {USER.company}
						</h2>
						<p className="font-body mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl">
							{USER.shortIntro}
						</p>

						{/* Social Links Row */}
						<div className="mt-8 flex items-center gap-3">
							{SOCIALS.map(({ name, href, icon: Icon }) => (
								<a
									key={name}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Visit my ${name}`}
									className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#222222] bg-[#111111] text-neutral-400 transition-all duration-300 hover:border-[#b5f542] hover:text-[#b5f542] hover:shadow-[0_0_10px_rgba(181,245,66,0.1)]"
								>
									<Icon className="h-5 w-5" />
								</a>
							))}

							{/* Terminal Link CTA */}
							<Link
								href="/terminal"
								className="group flex h-11 items-center gap-2 rounded-xl border border-[#b5f542] bg-[#b5f542]/5 px-5 text-sm font-semibold text-[#b5f542] transition-all duration-300 hover:bg-[#b5f542] hover:text-black hover:shadow-[0_0_15px_rgba(181,245,66,0.2)]"
							>
								<span>CRT Shell</span>
								<span className="transition-transform duration-300 group-hover:translate-x-0.5">
									→
								</span>
							</Link>
						</div>
					</div>

					{/* Premium Visual Monogram Container */}
					<div className="flex flex-1 items-center justify-center md:justify-end">
						<div className="group relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-3xl border border-[#222222] bg-[#111111] transition-all duration-500 hover:border-[#b5f542]/50 hover:shadow-[0_0_30px_rgba(181,245,66,0.1)] sm:h-80 sm:w-80 md:h-96 md:w-96">
							<img
								src="/assets/profile.jpg"
								alt="Anmol Kansal Profile Picture"
								className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
							/>
						</div>
					</div>
				</section>

				{/* Recent Blog Posts Snapshot */}
				<section className="mx-auto max-w-6xl border-t border-[#222222] px-6 py-16">
					<div className="mb-10 flex items-center justify-between">
						<h2 className="font-heading text-2xl font-black text-white md:text-3xl">
							Recent Articles
						</h2>
						<Link
							href="/blogs"
							className="font-heading text-sm font-semibold text-[#b5f542] transition-colors hover:text-white"
						>
							View All Blogs →
						</Link>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{initialAllBlogs.slice(0, 4).map((blog) => (
							<BlogCard key={blog.id} blog={blog} />
						))}
					</div>
				</section>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const initialAllBlogs = await getAllBlogs();

	return {
		props: {
			initialAllBlogs,
		},
		revalidate: 60,
	};
};
