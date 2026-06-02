import { GetStaticProps } from 'next';
import Head from 'next/head';

import { GrScorecard } from 'react-icons/gr';
import { IoCalendarOutline } from 'react-icons/io5';

import { SKILL_VS_ICON } from '@/src/client/constants/skill';
import { SOCIALS } from '@/src/client/constants/social';
import { ExperienceCard } from '@/src/client/components/ExperienceCard';
import { ProjectCard } from '@/src/client/components/ProjectCard';
import { PUBLICATION } from '@/src/shared/constants/publication';
import { USER } from '@/src/shared/constants/user';

type Props = {};

// Next.js Metadata configuration object (Next.js App Router style equivalent / compliance export)
export const metadata = {
	title: 'About — Anmol Kansal',
	description:
		'Learn more about Anmol Kansal, a Senior Frontend Engineer @ D.E. Shaw specializing in React, TypeScript, and state-of-the-art UI/UX architectures.',
	openGraph: {
		title: 'About — Anmol Kansal',
		description:
			'Learn more about Anmol Kansal, a Senior Frontend Engineer @ D.E. Shaw specializing in React, TypeScript, and state-of-the-art UI/UX architectures.',
		type: 'profile',
		url: 'https://www.anmolkansal.in/about',
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
		title: 'About — Anmol Kansal',
		description:
			'Learn more about Anmol Kansal, a Senior Frontend Engineer @ D.E. Shaw specializing in React, TypeScript, and state-of-the-art UI/UX architectures.',
		images: ['/assets/profile.jpg'],
	},
};

export default function About({}: Props) {
	const { experiences, projects, skillGroups, achievements, education } = USER;

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
			</Head>

			{/* About Page Outer Container in Dark Mode */}
			<div className="dark font-body bg-[#0a0a0a] text-neutral-100 selection:bg-[#b5f542]/20 selection:text-[#b5f542]">
				{/* Centered Single-Column Container */}
				<main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 py-16">
					{/* Bio Section */}
					<section className="flex flex-col items-center gap-6 text-center">
						<div className="relative h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-[#222222] shadow-lg">
							<img
								src={PUBLICATION.author.profilePicture || '/assets/profile.jpg'}
								alt="Anmol Kansal"
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="font-heading text-4xl font-black text-white sm:text-5xl">
								{USER.name}
							</h1>
							<h2 className="font-heading text-lg font-bold tracking-wide text-[#b5f542] uppercase">
								{USER.role} @ {USER.company}
							</h2>
						</div>
						<p className="font-body max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
							{USER.bio}
						</p>

						{/* Social Links Row */}
						<div className="mt-2 flex items-center gap-3">
							{SOCIALS.map(({ name, href, icon: Icon }) => (
								<a
									key={name}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Visit my ${name}`}
									className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#111111] text-neutral-400 transition-all duration-300 hover:scale-105 hover:border-[#b5f542] hover:text-[#b5f542] hover:shadow-[0_0_15px_rgba(181,245,66,0.15)]"
								>
									<Icon className="h-5 w-5" />
								</a>
							))}
						</div>
					</section>

					{/* Experience Timeline */}
					<section className="flex flex-col gap-8">
						<h3 className="font-heading border-b border-[#222222] pb-3 text-2xl font-black text-white">
							Professional Experience
						</h3>

						<div className="relative ml-4 flex flex-col gap-12 border-l-2 border-[#222222] pl-6">
							{experiences.map((exp) => (
								<div key={exp.id} className="relative flex flex-col gap-4">
									{/* Timeline junction dot */}
									<div className="absolute top-1.5 -left-[31px] flex h-4.5 w-4.5 items-center justify-center rounded-full border border-[#222222] bg-[#0a0a0a]">
										<div className="h-2 w-2 rounded-full bg-[#b5f542]"></div>
									</div>

									<ExperienceCard experience={exp} />
								</div>
							))}
						</div>
					</section>

					{/* Projects Section */}
					<section className="flex flex-col gap-8">
						<h3 className="font-heading border-b border-[#222222] pb-3 text-2xl font-black text-white">
							Featured Projects
						</h3>

						<div className="grid grid-cols-1 gap-6">
							{projects.map((proj, idx) => (
								<ProjectCard key={idx} project={proj} />
							))}
						</div>

						<div className="mt-2 flex justify-center">
							<a
								href="https://github.com/kansal-anmol"
								target="_blank"
								rel="noopener noreferrer"
								className="font-heading group flex items-center gap-1 text-sm font-semibold text-[#b5f542] hover:underline"
							>
								More on GitHub
								<span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
									→
								</span>
							</a>
						</div>
					</section>

					{/* Skills Section */}
					<section className="flex flex-col gap-8">
						<h3 className="font-heading border-b border-[#222222] pb-3 text-2xl font-black text-white">
							Skills & Capabilities
						</h3>

						<div className="flex flex-col gap-6">
							{skillGroups.map((group, gIdx) => (
								<div key={gIdx} className="flex flex-col gap-3">
									<h4 className="font-heading text-sm font-bold tracking-wider text-neutral-400 uppercase">
										{group.category}
									</h4>
									<div className="flex flex-wrap gap-2.5">
										{group.skills.map((skill, sIdx) => {
											const Icon = SKILL_VS_ICON[skill];
											return (
												<div
													key={sIdx}
													className="group flex cursor-default items-center gap-2 rounded-xl border border-[#222222] bg-[#111111] px-4 py-2.5 text-neutral-200 transition-all duration-300 hover:border-[#b5f542] hover:text-[#b5f542]"
												>
													{Icon && (
														<Icon className="h-4.5 w-4.5 text-neutral-400 transition-colors group-hover:text-[#b5f542]" />
													)}
													<span className="font-heading text-xs font-medium transition-colors group-hover:text-white">
														{skill}
													</span>
												</div>
											);
										})}
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Education & Achievements Section */}
					<section className="flex flex-col gap-8">
						<h3 className="font-heading border-b border-[#222222] pb-3 text-2xl font-black text-white">
							Education & Highlights
						</h3>

						<div className="flex flex-col gap-6">
							{/* Education Cards */}
							{education.map((edu) => (
								<div
									key={edu.id}
									className="flex flex-col gap-4 rounded-2xl border border-[#222222] bg-[#111111] p-6"
								>
									<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
										<div className="flex flex-col">
											<h4 className="font-heading text-lg font-bold text-white">{edu.school}</h4>
											<p className="font-heading mt-0.5 text-sm font-semibold tracking-wide text-[#b5f542] uppercase">
												{edu.degree}
											</p>
										</div>
										<div className="flex flex-col gap-1 text-xs font-medium text-neutral-500 sm:items-end">
											<span className="flex items-center gap-1.5">
												<IoCalendarOutline />
												{edu.time}
											</span>
											<span className="flex items-center gap-1.5 text-[#b5f542]">
												<GrScorecard />
												{edu.score}
											</span>
										</div>
									</div>
								</div>
							))}

							{/* Achievements Card */}
							<div className="flex flex-col gap-4 rounded-2xl border border-[#222222] bg-[#111111] p-6">
								<h4 className="font-heading text-sm font-bold tracking-wider text-neutral-400 uppercase">
									Competitive Coding & Achievements
								</h4>
								<ul className="flex list-disc flex-col gap-2.5 pl-6 text-sm leading-relaxed text-neutral-300">
									{achievements.map((item, index) => (
										<li key={index} className="marker:text-[#b5f542]">
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	return {
		props: {},
		revalidate: 60,
	};
};
