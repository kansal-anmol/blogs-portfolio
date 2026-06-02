// Types
import type { Post as Blog } from '@/src/shared/types';

type BlogHeaderProps = {
	blog: Blog;
	formatDate: (dateStr: string) => string;
};

export const BlogHeader = ({ blog, formatDate }: BlogHeaderProps) => {
	const authorName = blog.author?.name;
	const authorPicture = blog.author?.profilePicture;

	return (
		<header className="flex flex-col gap-6">
			<h1 className="font-heading text-4xl leading-tight font-extrabold text-white md:text-5xl">
				{blog.title}
			</h1>

			{/* 16:9 Banner Cover Image */}
			{blog.coverImage?.url && (
				<div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#222222] bg-[#111111] select-none">
					<img src={blog.coverImage?.url} alt={blog.title} className="h-full w-full object-cover" />
				</div>
			)}

			{/* Meta Row */}
			<div className="flex items-center gap-2.5 border-b border-[#222222] pb-6 text-xs font-semibold text-neutral-400 select-none">
				<img
					src={authorPicture}
					alt={authorName}
					className="h-6 w-6 rounded-full border border-[#222222]"
				/>
				<span>{authorName}</span>
				<span className="text-neutral-700">•</span>
				<span>{formatDate(blog.publishedAt)}</span>
				<span className="text-neutral-700">•</span>
				<span>{blog.readTimeInMinutes} min read</span>
			</div>
		</header>
	);
};
