// Libs
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';

// Apis
import { getAllBlogs } from '@/lib/local-blogs';

// Components
import { Container } from '@/src/client/components/Container';
import { Terminal } from '@/src/client/components/terminal';

// Constants
import {
	ABOUT_COMMAND,
	BLOGS_COMMAND,
	CONTACT_COMMAND,
	EXPERIENCE_COMMAND,
	OPEN_COMMAND,
	PROJECTS_COMMAND,
	WHOAMI_COMMAND,
} from '@/src/client/constants/commands';
import { USER } from '@/src/shared/constants/user';

// Types
import type { Post } from '@/lib/types';
import type { Command } from '@/src/client/components/terminal/types';

type TerminalPageProps = {
	posts: Post[];
};

export default function TerminalPage({ posts }: TerminalPageProps) {
	// Define commands array representing your portfolio data
	const commands: Command[] = useMemo(
		() => [
			WHOAMI_COMMAND,
			ABOUT_COMMAND,
			EXPERIENCE_COMMAND,
			PROJECTS_COMMAND,
			{
				...BLOGS_COMMAND,
				meta: { posts },
			},
			{
				...OPEN_COMMAND,
				meta: { posts },
			},
			CONTACT_COMMAND,
		],
		[posts],
	);

	return (
		<>
			<Head>
				<title>Terminal — {USER.name}</title>
				<meta
					name="description"
					content={`Interactive developer CRT command shell terminal. Explore ${USER.name}'s experience, projects, and blogs using CLI commands.`}
				/>
				<meta name="robots" content="noindex, nofollow" />
			</Head>

			{/* Terminal Outer Container in Dark Mode */}
			<div className="dark font-body flex flex-grow flex-col justify-center bg-[#0a0a0a] py-12 text-neutral-100 selection:bg-[#b5f542]/20 selection:text-[#b5f542]">
				{/* Center Screen Terminal viewport container */}
				<Container className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6">
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
							<Terminal username="anmol" hostname="anmolkansal.in" commands={commands} prompt="$" />
						</div>
					</div>
				</Container>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps<TerminalPageProps> = async () => {
	const posts = await getAllBlogs();

	return {
		props: {
			posts,
		},
		revalidate: 60,
	};
};
