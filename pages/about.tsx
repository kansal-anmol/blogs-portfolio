import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { DiVisualstudio } from 'react-icons/di';
import {
	FaCode,
	FaCss3Alt,
	FaDocker,
	FaGithub,
	FaHtml5,
	FaLinkedinIn,
	FaNodeJs,
	FaReact,
} from 'react-icons/fa';
import { GrScorecard } from 'react-icons/gr';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import {
	SiChakraui,
	SiCplusplus,
	SiExpress,
	SiGraphql,
	SiHashnode,
	SiJavascript,
	SiJest,
	SiJira,
	SiMongodb,
	SiNextdotjs,
	SiPrisma,
	SiRedux,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si';

import { AppProvider } from '@/components/contexts/appContext';
import { Layout } from '@/components/layout';
import { getPublicationData } from '@/lib/local-publication';
import { Publication } from '@/lib/types';

type Props = {
	publication: Publication;
};

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
		url: 'https://anmol-kansal.hashnode.dev/about',
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

export default function About({ publication }: Props) {
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

	const experiences = [
		{
			id: '0',
			role: 'Senior Member, Tech',
			time: 'May, 2024 - Present',
			company: 'D. E. Shaw India',
			location: 'Hyderabad, India',
			logo: '/assets/d_e_shaw_india_private_limited_logo.jpeg',
			companyDescription:
				'The D. E. Shaw group is a global investment and technology development firm with more than $60 billion in investment capital.',
			responsibilities: [
				'Working as a part of the DJS Infra team focused on building scalable and robust web infrastructure supporting 200+ production web applications firm-wide.',
			],
		},
		{
			id: '1',
			role: 'Senior Product Engineer',
			time: 'April, 2023 - May, 2024',
			company: 'Sprinklr',
			location: 'Gurugram, India',
			logo: '/assets/sprinklr_logo.jpeg',
			responsibilities: [
				'Maintained a single page application (SPA) having 30+ routes by working in collaboration with Backend Developers, Product Managers and Designers etc.',
				'Languages and Tools - HTML, CSS, JavaScript, TypeScript, ReactJS, Next, Jest, Redux, Apollo GraphQL Client, Git etc.',
				'Provided mentorship to two new team members, facilitating their successful onboarding and contributing to their professional development within the organization.',
				'Top performer for major release of Distributed platform in Q2, Q3 and Q4 2023.',
				"Added bulk actions support in the contacts' module of Distributed platform.",
			],
		},
		{
			id: '2',
			role: 'Product Engineer',
			time: 'June, 2021 - March, 2023',
			company: 'Sprinklr',
			location: 'Gurugram, India',
			logo: '/assets/sprinklr_logo.jpeg',
			responsibilities: [
				'Reduced Docker Image Size by 30% (approximately 1.53 GB).',
				'Integrated Stack Exchange and Stack Overflow channels in Distributed platform.',
				'Added Translate action for inbound, outbound, suggestion and universal case messages in Distributed platform.',
				'Added react-virtualized components which resulted in achieving a smooth 60FPS scrolling experience for infinite lists.',
				'Incorporated Sentry for real-time error tracking and performance monitoring in Production, ensuring proactive issue identification.',
			],
		},
		{
			id: '3',
			role: 'Product Engineering Intern',
			time: 'May, 2020 - June, 2020',
			company: 'Sprinklr',
			location: 'Gurugram, India',
			logo: '/assets/sprinklr_logo.jpeg',
			responsibilities: [
				'Developed the Actions Config Builder tool to automate the generation of experience configs for message actions.',
				'This resulted in significantly reducing the workload for both developers and testers and streamlining the configuration process (approx 20%).',
			],
		},
	];

	const projects = [
		{
			title: 'Perfecto',
			description:
				'A full-stack restaurant app featuring order placement, tracking, table booking, and admin management dashboard.',
			coverImage: '/assets/projects/perfecto/home_page.png',
			stack: ['TypeScript', 'React', 'Next.js', 'Chakra UI', 'GraphQL', 'Node.js', 'Prisma'],
			demoUrl: 'https://perfecto.vercel.app/',
			sourceUrl: 'https://github.com/kansal-anmol/perfecto',
		},
		{
			title: 'Chess Cube',
			description:
				'An online multiplayer chess game using chess.js, socket.io and chessboard API managing complex real-time interactive states.',
			coverImage: '/assets/projects/chessCube/home_page.png',
			stack: ['JavaScript', 'Node.js', 'Socket.io', 'Semantic UI'],
			demoUrl: 'https://online-multiplayer-chess-seven.vercel.app/',
			sourceUrl: 'https://github.com/kansal-anmol/Online-Multiplayer-Chess',
		},
		{
			title: 'Medium Clone',
			description:
				'A functional clone of Medium using React, Next.js, and Sanity.io CMS with commenting and post generation mechanics.',
			coverImage: '/assets/projects/mediumClone/home_page.png',
			stack: ['React', 'Next.js', 'TailwindCSS', 'Sanity.io', 'GraphQL'],
			demoUrl: 'https://medium-clone-jet-phi.vercel.app/',
			sourceUrl: 'https://github.com/kansal-anmol/medium-clone',
		},
	];

	const skillGroups = [
		{
			category: 'Frontend',
			skills: [
				{ name: 'React', icon: FaReact },
				{ name: 'TypeScript', icon: SiTypescript },
				{ name: 'Next.js', icon: SiNextdotjs },
				{ name: 'Tailwind CSS', icon: SiTailwindcss },
				{ name: 'Chakra UI', icon: SiChakraui },
				{ name: 'Redux', icon: SiRedux },
				{ name: 'GraphQL', icon: SiGraphql },
				{ name: 'JavaScript', icon: SiJavascript },
				{ name: 'HTML', icon: FaHtml5 },
				{ name: 'CSS', icon: FaCss3Alt },
			],
		},
		{
			category: 'Backend',
			skills: [
				{ name: 'Node.js', icon: FaNodeJs },
				{ name: 'Prisma', icon: SiPrisma },
				{ name: 'MongoDB', icon: SiMongodb },
				{ name: 'Express', icon: SiExpress },
				{ name: 'GraphQL', icon: SiGraphql },
				{ name: 'Jest', icon: SiJest },
			],
		},
		{
			category: 'Tools & Languages',
			skills: [
				{ name: 'C++', icon: SiCplusplus },
				{ name: 'Docker', icon: FaDocker },
				{ name: 'GitHub', icon: FaGithub },
				{ name: 'Jira', icon: SiJira },
				{ name: 'VS Code', icon: DiVisualstudio },
			],
		},
	];

	const achievements = [
		'Secured an All India Rank of 3743 in JEE Mains 2017 out of 1.3 Million students.',
		'CodeForces Max Rating: 1742 (Expert)',
		'CodeChef Max Rating: 1890 (4 Star)',
		'Achieved 817 Global Rank in Google Kickstart Round B, 2020',
	];

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
				</Head>

				{/* About Page Outer Container in Dark Mode */}
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
									className="font-heading text-sm font-semibold text-[#b5f542] transition-colors"
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
									className="font-heading py-1 text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
								>
									Home
								</Link>
								<Link
									href="/about"
									onClick={() => setIsMobileMenuOpen(false)}
									className="font-heading py-1 text-sm font-semibold text-[#b5f542]"
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

					{/* Centered Single-Column Container */}
					<main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 py-16">
						{/* Bio Section */}
						<section className="flex flex-col items-center gap-6 text-center">
							<div className="relative h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-[#222222] shadow-lg">
								<img
									src={publication.author.profilePicture || '/assets/profile.jpg'}
									alt="Anmol Kansal"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<h1 className="font-heading text-4xl font-black tracking-tight text-white">
									Anmol Kansal
								</h1>
								<h2 className="font-heading text-md font-bold tracking-wider text-[#b5f542] uppercase">
									Senior Frontend Engineer @ D.E. Shaw
								</h2>
							</div>
							<p className="font-body text-md max-w-xl leading-relaxed text-neutral-400">
								I am a passionate software engineer with more than 3.5 years of industry experience
								building high-performance web products. I specialize in architecting
								state-of-the-art Single Page Applications with TypeScript, React, and GraphQL to
								solve challenging visual and infrastructure tasks.
							</p>

							{/* Social Links Row */}
							<div className="mt-2 flex items-center gap-3">
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

										{/* Company Title Header */}
										<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
											<div className="flex items-center gap-3">
												<div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#222222] bg-[#111111]">
													{exp.logo ? (
														<img
															src={exp.logo}
															alt={exp.company}
															className="h-full w-full object-cover"
														/>
													) : (
														<FaCode className="h-4 w-4 text-[#b5f542]" />
													)}
												</div>
												<div>
													<h4 className="font-heading text-md font-extrabold text-white">
														{exp.company}
													</h4>
													<p className="font-heading text-xs font-semibold tracking-wider text-[#b5f542] uppercase">
														{exp.role}
													</p>
												</div>
											</div>
											<div className="flex flex-col gap-0.5 pl-11 text-xs font-medium text-neutral-500 sm:items-end sm:pl-0">
												<span className="flex items-center gap-1">
													<IoCalendarOutline />
													{exp.time}
												</span>
												<span className="flex items-center gap-1">
													<IoLocationOutline />
													{exp.location}
												</span>
											</div>
										</div>

										{/* Responsibilities list */}
										<ul className="flex list-disc flex-col gap-2 pl-12 text-sm leading-relaxed text-neutral-400">
											{exp.responsibilities.map((resp, i) => (
												<li key={i}>{resp}</li>
											))}
										</ul>
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
									<div
										key={idx}
										className="group flex flex-col overflow-hidden rounded-2xl border border-[#222222] bg-[#111111] transition-all duration-300 hover:border-[#b5f542] hover:shadow-[0_8px_30px_rgba(181,245,66,0.04)] md:flex-row"
									>
										<div className="relative h-48 shrink-0 overflow-hidden border-b border-[#222222] bg-neutral-900 md:h-auto md:w-56 md:border-r md:border-b-0">
											<img
												src={proj.coverImage}
												alt={proj.title}
												className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
											/>
										</div>
										<div className="flex flex-grow flex-col justify-between gap-5 p-5">
											<div className="flex flex-col gap-2">
												<h4 className="font-heading text-lg font-bold text-white transition-colors group-hover:text-[#b5f542]">
													{proj.title}
												</h4>
												<p className="font-body text-sm leading-relaxed text-neutral-400">
													{proj.description}
												</p>
											</div>

											{/* Stack chips */}
											<div className="flex flex-wrap gap-1.5">
												{proj.stack.map((tech) => (
													<span
														key={tech}
														className="rounded bg-[#222222] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#b5f542] uppercase"
													>
														{tech}
													</span>
												))}
											</div>

											{/* Action Buttons */}
											<div className="flex items-center gap-3">
												<a
													href={proj.demoUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="flex-1 rounded-xl border border-transparent bg-[#b5f542] px-4 py-2 text-center text-xs font-semibold text-black shadow-sm transition-all duration-300 hover:border-[#b5f542] hover:bg-black hover:text-[#b5f542] sm:flex-initial"
												>
													Live Demo
												</a>
												<a
													href={proj.sourceUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="flex-1 rounded-xl border border-[#222222] bg-[#222222] px-4 py-2 text-center text-xs font-semibold text-[#b5f542] transition-all duration-300 hover:border-[#b5f542] hover:bg-black sm:flex-initial"
												>
													Source Code
												</a>
											</div>
										</div>
									</div>
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
												const Icon = skill.icon;
												return (
													<div
														key={sIdx}
														className="group flex cursor-default items-center gap-2 rounded-xl border border-[#222222] bg-[#111111] px-4 py-2.5 text-neutral-200 transition-all duration-300 hover:border-[#b5f542] hover:text-[#b5f542]"
													>
														<Icon className="h-4.5 w-4.5 text-neutral-400 transition-colors group-hover:text-[#b5f542]" />
														<span className="font-heading text-xs font-medium transition-colors group-hover:text-white">
															{skill.name}
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
								{/* Education Card */}
								<div className="flex flex-col gap-4 rounded-2xl border border-[#222222] bg-[#111111] p-6">
									<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
										<div className="flex flex-col">
											<h4 className="font-heading text-lg font-bold text-white">
												Netaji Subhas Institute of Technology, Delhi
											</h4>
											<p className="font-heading mt-0.5 text-sm font-semibold tracking-wide text-[#b5f542] uppercase">
												B.E. in Information Technology
											</p>
										</div>
										<div className="flex flex-col gap-1 text-xs font-medium text-neutral-500 sm:items-end">
											<span className="flex items-center gap-1.5">
												<IoCalendarOutline />
												2017 - 2021
											</span>
											<span className="flex items-center gap-1.5 text-[#b5f542]">
												<GrScorecard />
												9.14 CGPA
											</span>
										</div>
									</div>
								</div>

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

					{/* Footer */}
					<footer className="border-t border-[#222222] bg-[#0a0a0a] py-12">
						<div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-6">
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

	return {
		props: {
			publication,
		},
		revalidate: 60,
	};
};
