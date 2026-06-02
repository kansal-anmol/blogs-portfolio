// Libs
import { GetStaticProps } from 'next';
import { useMemo } from 'react';

// Components
import { PageMetadata } from '@/src/client/components/PageMetadata';

// Apis
import { getAllBlogs, getUserData } from '@/src/server';

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

// Types
import type { Command } from '@/src/client/components/terminal/types';
import type { Post, User } from '@/src/shared/types';

type TerminalPageProps = {
	posts: Post[];
	user: User;
};

export default function TerminalPage({ posts, user }: TerminalPageProps) {
	// Define commands array representing your portfolio data
	const commands: Command[] = useMemo(
		() => [
			{
				...WHOAMI_COMMAND,
				meta: { user },
			},
			{
				...ABOUT_COMMAND,
				meta: { user },
			},
			{
				...EXPERIENCE_COMMAND,
				meta: { user },
			},
			{
				...PROJECTS_COMMAND,
				meta: { user },
			},
			{
				...BLOGS_COMMAND,
				meta: { posts },
			},
			{
				...OPEN_COMMAND,
				meta: { posts },
			},
			{
				...CONTACT_COMMAND,
				meta: { user },
			},
		],
		[posts, user],
	);

	return (
		<>
			<PageMetadata
				user={user}
				title="Terminal"
				description={`Interactive developer CRT command shell terminal. Explore ${user.name}'s experience, projects, and blogs using CLI commands.`}
				urlPath="/terminal"
				noIndex={true}
			/>

			{/* Outer Page Layout in Dark Mode */}
			<div
				className="dark font-body overflow-hidden bg-black text-neutral-100 select-none selection:bg-[#b5f542]/20 selection:text-[#b5f542]"
				style={{ height: '80vh' }}
			>
				{/* Full-width container with flex layouts */}
				<Container className="mx-auto flex h-full max-w-5xl flex-col items-center p-6 md:py-8">
					<div className="relative flex h-full w-full flex-col rounded-xl border border-[#222222] bg-[#0c0c0c]/40 backdrop-blur-lg">
						{/* CRT Scanline and Flicker Visual overlays */}
						<div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-85" />
						<div className="animate-flicker pointer-events-none absolute inset-0 z-20 bg-transparent opacity-15" />

						{/* Terminal Window Header Bar */}
						<div className="flex w-full shrink-0 items-center justify-between rounded-t-xl border-b border-[#222222] bg-[#111111]/80 px-4 py-3 select-none">
							{/* Mac window window buttons */}
							<div className="flex gap-2">
								<span className="h-3 w-3 rounded-full border border-neutral-700 bg-neutral-800" />
								<span className="h-3 w-3 rounded-full border border-neutral-700 bg-neutral-800" />
								<span className="h-3 w-3 rounded-full border border-neutral-700 bg-neutral-800" />
							</div>
							<span className="text-2xs font-mono font-semibold tracking-wider text-neutral-500 uppercase">
								zsh — CRT Terminal
							</span>
							<div className="w-13" />
						</div>

						{/* Active Terminal Container */}
						<div className="z-15 h-full w-full overflow-hidden">
							<Terminal username="root" hostname="anmolkansal.in" commands={commands} prompt="$" />
						</div>
					</div>
				</Container>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps<TerminalPageProps> = async () => {
	const posts = await getAllBlogs();
	const user = getUserData();

	return {
		props: {
			posts,
			user,
		},
		revalidate: 60,
	};
};
