import { GetStaticProps } from 'next';

import { BlogGrid } from '@/src/client/components/blogGrid';
import { PageMetadata } from '@/src/client/components/PageMetadata';
import { getAllBlogs, getUserData } from '@/src/server';
import { Post as Blog, User } from '@/src/shared/types';

type Props = {
	blogs: Blog[];
	user: User;
};

export default function BlogsPage({ blogs, user }: Props) {
	return (
		<>
			<PageMetadata
				user={user}
				title="Blog"
				description="Articles on TypeScript, React, Next.js, and frontend engineering."
				urlPath="/blogs"
			/>

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
	const user = getUserData();

	return {
		props: {
			blogs,
			user,
		},
		revalidate: 60,
	};
};
