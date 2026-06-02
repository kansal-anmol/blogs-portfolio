import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';

import { Container } from '@/components/container';
import { AppProvider } from '@/components/contexts/appContext';
import { Layout } from '@/components/layout';
import { getAllPosts } from '@/lib/local-blogs';
import { getPublicationData } from '@/lib/local-publication';
import type { Post, Publication } from '@/lib/types';
import { Terminal } from '@/src/components/terminal';

type Props = {
	publication: Publication;
	initialAllPosts: Post[];
};

export default function TerminalPage({ publication, initialAllPosts }: Props) {
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

	// Define commands map representing your portfolio data
	const commandMap: Record<string, (args: string[]) => React.ReactNode> = {
		help: () => (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
				<div>anmolkansal.in shell, version 1.0.0-release</div>
				<div>These shell commands are defined internally. Type 'help' to see this list.</div>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '150px 1fr',
						gap: '8px',
						marginTop: '8px',
					}}
				>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>help</span>
					<span style={{ color: '#a3a3a3' }}>Lists all available shell commands</span>

					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>whoami</span>
					<span style={{ color: '#a3a3a3' }}>Short personal introduction paragraph</span>

					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>about</span>
					<span style={{ color: '#a3a3a3' }}>
						Renders complete bio summary and tech capabilities
					</span>

					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>experience</span>
					<span style={{ color: '#a3a3a3' }}>Renders detailed work history milestones</span>

					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>projects</span>
					<span style={{ color: '#a3a3a3' }}>
						Renders featured engineering projects with Source + Demo links
					</span>

					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>blogs</span>
					<span style={{ color: '#a3a3a3' }}>
						Lists recent blogs. Use 'blogs --tag &lt;tag&gt;' to filter
					</span>

					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>open &lt;n&gt;</span>
					<span style={{ color: '#a3a3a3' }}>
						Opens post of index &lt;n&gt; in a new browser tab (e.g. open 1)
					</span>

					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>contact</span>
					<span style={{ color: '#a3a3a3' }}>Renders active social networking profile links</span>

					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>clear</span>
					<span style={{ color: '#a3a3a3' }}>Clears the active logs history</span>
				</div>
			</div>
		),

		whoami: () => (
			<div style={{ color: '#f3f4f6', lineHeight: '1.6' }}>
				Hello! I am Anmol Kansal, a Senior Frontend Engineer @ D.E. Shaw India Pvt. Ltd. I
				specialize in React, TypeScript, and state-of-the-art web architectures. I design scalable
				frontend infrastructures and bring visual experiences to life.
			</div>
		),

		about: () => (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				<div>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>BIO: </span>I have more than 3.5
					years of industry experience developing scalable web interfaces. Currently a Senior
					Member, Tech at D.E. Shaw India. Dedicated to clean coding, performant bundle loading, and
					highly optimized animation layers.
				</div>
				<div>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>CAPABILITIES:</span>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '120px 1fr',
							gap: '6px',
							marginTop: '4px',
							paddingLeft: '8px',
						}}
					>
						<span style={{ color: '#a3a3a3' }}>Frontend:</span>
						<span>
							React, TypeScript, Next.js, Redux, Chakra UI, GraphQL, Tailwind CSS, HTML5, CSS3
						</span>

						<span style={{ color: '#a3a3a3' }}>Backend:</span>
						<span>Node.js, Prisma, MongoDB, PlanetScale, Express, Jest</span>

						<span style={{ color: '#a3a3a3' }}>Tools & Langs:</span>
						<span>C++, Docker, Git, Jira, VS Code</span>
					</div>
				</div>
			</div>
		),

		experience: () => (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
				<div>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>
						[1] Senior Member, Tech @ D.E. Shaw India
					</span>{' '}
					(May, 2024 - Present)
					<div style={{ color: '#a3a3a3', paddingLeft: '8px', fontSize: '13px' }}>
						Building scalable and robust web infrastructure supporting 200+ production web
						applications firm-wide.
					</div>
				</div>
				<div>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>
						[2] Senior Product Engineer @ Sprinklr
					</span>{' '}
					(April, 2023 - May, 2024)
					<div style={{ color: '#a3a3a3', paddingLeft: '8px', fontSize: '13px' }}>
						Maintained SPAs with 30+ routes and mentored team members. Top performer of releases.
					</div>
				</div>
				<div>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>
						[3] Product Engineer @ Sprinklr
					</span>{' '}
					(June, 2021 - March, 2023)
					<div style={{ color: '#a3a3a3', paddingLeft: '8px', fontSize: '13px' }}>
						Reduced Docker size by 30%, integrated sentry error logging, and achieved 60FPS lists.
					</div>
				</div>
				<div>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>
						[4] Product Engineering Intern @ Sprinklr
					</span>{' '}
					(May, 2020 - June, 2020)
					<div style={{ color: '#a3a3a3', paddingLeft: '8px', fontSize: '13px' }}>
						Developed Actions Config Builder tool reducing developer/tester workloads.
					</div>
				</div>
			</div>
		),

		projects: () => (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
				<div>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>Perfecto</span>
					<div style={{ color: '#a3a3a3', fontSize: '13px' }}>
						A full-stack restaurant app using Next.js, GraphQL, Node.js, Prisma, and PlanetScale.
					</div>
					<div style={{ display: 'flex', gap: '12px', fontSize: '12px', marginTop: '2px' }}>
						<a
							href="https://perfecto.vercel.app/"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: '#4ade80', textDecoration: 'underline' }}
						>
							Demo
						</a>
						<a
							href="https://github.com/kansal-anmol/perfecto"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: '#4ade80', textDecoration: 'underline' }}
						>
							Source
						</a>
					</div>
				</div>
				<div>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>Chess Cube</span>
					<div style={{ color: '#a3a3a3', fontSize: '13px' }}>
						An online multiplayer chess game using chess.js, socket.io and chessboard API.
					</div>
					<div style={{ display: 'flex', gap: '12px', fontSize: '12px', marginTop: '2px' }}>
						<a
							href="https://online-multiplayer-chess-seven.vercel.app/"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: '#4ade80', textDecoration: 'underline' }}
						>
							Demo
						</a>
						<a
							href="https://github.com/kansal-anmol/Online-Multiplayer-Chess"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: '#4ade80', textDecoration: 'underline' }}
						>
							Source
						</a>
					</div>
				</div>
				<div>
					<span style={{ color: '#b5f542', fontWeight: 'bold' }}>Medium Clone</span>
					<div style={{ color: '#a3a3a3', fontSize: '13px' }}>
						A clone of Medium built with React, Next.js, and Sanity.io CMS.
					</div>
					<div style={{ display: 'flex', gap: '12px', fontSize: '12px', marginTop: '2px' }}>
						<a
							href="https://medium-clone-jet-phi.vercel.app/"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: '#4ade80', textDecoration: 'underline' }}
						>
							Demo
						</a>
						<a
							href="https://github.com/kansal-anmol/medium-clone"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: '#4ade80', textDecoration: 'underline' }}
						>
							Source
						</a>
					</div>
				</div>
				<div style={{ marginTop: '4px' }}>
					<a
						href="https://github.com/kansal-anmol"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: '#b5f542', textDecoration: 'underline', fontWeight: 'bold' }}
					>
						More on GitHub →
					</a>
				</div>
			</div>
		),

		blogs: (args: string[]) => {
			let posts = initialAllPosts;

			if (args.includes('--tag')) {
				const tagIdx = args.indexOf('--tag');
				const tagValue = args[tagIdx + 1]?.toLowerCase();

				if (!tagValue) {
					return (
						<span style={{ color: '#ef4444' }}>
							Error: Please provide a tag. Usage: blogs --tag &lt;tag-name&gt;
						</span>
					);
				}

				posts = posts.filter((post) => post.tags?.some((t) => t.name.toLowerCase() === tagValue));
			}

			if (posts.length === 0) {
				return <span>No matching articles found.</span>;
			}

			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
					{posts.map((post, index) => (
						<div key={post.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
							<span style={{ color: '#b5f542', fontWeight: 'bold' }}>[{index + 1}]</span>
							<span style={{ color: '#a3a3a3', whiteSpace: 'nowrap' }}>
								{new Date(post.publishedAt).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
								})}
							</span>
							<span>{post.title}</span>
						</div>
					))}
					<div style={{ color: '#a3a3a3', fontSize: '12px', marginTop: '6px' }}>
						Type 'open &lt;index&gt;' (e.g., 'open 1') to open the corresponding article.
					</div>
				</div>
			);
		},

		open: (args: string[]) => {
			const idxStr = args[0];
			if (!idxStr) {
				return (
					<span style={{ color: '#ef4444' }}>
						Error: Please specify the article index number (e.g. open 1)
					</span>
				);
			}

			const index = parseInt(idxStr, 10) - 1;
			if (isNaN(index) || index < 0 || index >= initialAllPosts.length) {
				return (
					<span style={{ color: '#ef4444' }}>
						Error: Invalid index. Range is 1 to {initialAllPosts.length}.
					</span>
				);
			}

			const post = initialAllPosts[index];
			if (typeof window !== 'undefined') {
				window.open(`/blog/${post.slug}`, '_blank');
			}
			return (
				<span>
					Opening article: <strong style={{ color: '#b5f542' }}>{post.title}</strong> in a new
					tab...
				</span>
			);
		},

		contact: () => (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
				<div>Reach out via any of the social channels below:</div>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '120px 1fr',
						gap: '6px',
						marginTop: '4px',
						paddingLeft: '8px',
					}}
				>
					<span style={{ color: '#a3a3a3' }}>GitHub:</span>
					<a
						href={publication.links?.github || 'https://github.com/kansal-anmol'}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: '#4ade80', textDecoration: 'underline' }}
					>
						github.com/kansalanmol0609
					</a>

					<span style={{ color: '#a3a3a3' }}>LinkedIn:</span>
					<a
						href={publication.links?.linkedin || 'https://www.linkedin.com/in/kansal-anmol/'}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: '#4ade80', textDecoration: 'underline' }}
					>
						linkedin.com/in/kansalanmol0609
					</a>

					<span style={{ color: '#a3a3a3' }}>X (Twitter):</span>

					<span style={{ color: '#a3a3a3' }}>Hashnode:</span>
					<a
						href={publication.links?.hashnode || 'https://hashnode.com/@kansalanmol0609'}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: '#4ade80', textDecoration: 'underline' }}
					>
						hashnode.com/@kansalanmol0609
					</a>
				</div>
			</div>
		),
	};

	return (
		<AppProvider publication={publication}>
			<Layout>
				<Head>
					<title>Terminal — Anmol Kansal</title>
					<meta
						name="description"
						content="Interactive developer CRT command shell terminal. Explore Anmol Kansal's experience, projects, and blogs using CLI commands."
					/>
					<meta name="robots" content="noindex, nofollow" />
				</Head>

				{/* Terminal Outer Container in Dark Mode */}
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
									className="font-heading text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
								>
									Blog
								</Link>
								<Link
									href="/terminal"
									className="font-heading text-sm font-semibold text-[#b5f542] transition-colors"
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
									className="font-heading py-1 text-sm font-medium text-neutral-400 transition-colors hover:text-[#b5f542]"
								>
									Blog
								</Link>
								<Link
									href="/terminal"
									onClick={() => setIsMobileMenuOpen(false)}
									className="font-heading py-1 text-sm font-semibold text-[#b5f542]"
								>
									Terminal
								</Link>
							</div>
						)}
					</nav>

					{/* Center Screen Terminal viewport container */}
					<Container className="mx-auto flex min-h-[calc(100vh-16rem)] max-w-6xl flex-col items-center justify-center px-6 py-12">
						<div className="relative flex h-[600px] w-full max-w-4xl items-center justify-center overflow-hidden rounded-2xl border border-[#222222] bg-[#000000] p-4 shadow-2xl">
							{/* CRT Scanline Overlay Animation */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
									backgroundSize: '100% 4px',
									pointerEvents: 'none',
									zIndex: 11,
									opacity: 0.8,
								}}
							/>

							{/* CRT Screen Corner Vignette Glow */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									background:
										'radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.8) 100%)',
									pointerEvents: 'none',
									zIndex: 12,
								}}
							/>

							{/* Active Terminal Container */}
							<div className="relative z-15 h-full w-full">
								<Terminal
									user="anmol"
									hostname="portfolio"
									bootMessage={`Booting anmolkansal.in... done.\nType 'help' to view the list of commands.`}
									commands={commandMap}
									prompt="$"
								/>
							</div>
						</div>
					</Container>

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
