import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { BlogCard } from '@/src/client/components/BlogCard';
import { PageMetadata } from '@/src/client/components/PageMetadata';
import { SOCIAL_ICONS } from '@/src/client/constants/social';
import { getAllBlogs, getUserData } from '@/src/server';
import { HOST_NAME } from '@/src/shared/constants';
import { Post as Blog, User } from '@/src/shared/types';

type Props = {
	initialAllBlogs: Blog[];
	user: User;
};

export default function Index({ initialAllBlogs, user }: Props) {
	const activeSocials = (user.socials || [])
		.filter((s) => SOCIAL_ICONS[s.name])
		.map((s) => ({ name: s.name, href: s.url, icon: SOCIAL_ICONS[s.name] }));

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: user.name,
		jobTitle: user.role,
		worksFor: {
			'@type': 'Organization',
			name: user.company,
		},
		url: HOST_NAME,
		image: '/assets/profile.png',
		sameAs: activeSocials.map((s) => s.href),
	};

	return (
		<>
			<PageMetadata user={user} />
			<Head>
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
							{user.name}
						</h1>
						<h2 className="font-heading mt-4 text-lg font-bold tracking-wide text-[#b5f542] uppercase sm:mt-6 sm:text-xl md:text-2xl">
							{user.role}
						</h2>
						<p className="font-body mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl">
							{user.shortIntro}
						</p>

						{/* Social Links Row */}
						<div className="mt-8 flex items-center gap-3">
							{activeSocials.map(({ name, href, icon: Icon }) => (
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
								src="/assets/profile.png"
								alt="Profile Picture"
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
	const user = getUserData();

	return {
		props: {
			initialAllBlogs,
			user,
		},
		revalidate: 60,
	};
};
