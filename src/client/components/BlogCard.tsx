import { Post as Blog } from '@/src/shared/types';
import Link from 'next/link';
import React from 'react';

interface BlogCardProps {
	blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
	const primaryTag = blog.tags?.[0]?.name || 'Engineering';

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	return (
		<Link
			href={`/blog/${blog.slug}`}
			className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#222222] bg-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#333333] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
		>
			{/* 16:9 Aspect Ratio Header */}
			<div className="relative aspect-video w-full overflow-hidden border-b border-[#222222] bg-neutral-900">
				{blog.coverImage?.url ? (
					<img
						src={blog.coverImage.url}
						alt={blog.title}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
					/>
				) : (
					/* Dark primary tag fallback placeholder */
					<div className="flex h-full w-full items-center justify-center bg-[#161616] select-none">
						<span className="font-heading text-sm font-black tracking-widest text-[#b5f542] uppercase opacity-80">
							{primaryTag}
						</span>
					</div>
				)}
			</div>

			{/* Card Content Area */}
			<div className="flex flex-grow flex-col justify-between gap-4 p-4.5">
				<div className="flex flex-col gap-2">
					{/* Tag Pill Chip */}
					<div>
						<span className="inline-block rounded border border-[#222222] bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-bold tracking-wider text-neutral-400 uppercase transition-colors duration-300 group-hover:border-[#b5f542]/20 group-hover:text-[#b5f542]">
							{primaryTag}
						</span>
					</div>

					{/* Blog Title */}
					<h3 className="font-heading line-clamp-2 text-base leading-snug font-medium text-neutral-100 transition-colors duration-300 group-hover:text-[#b5f542]">
						{blog.title}
					</h3>
				</div>

				{/* Date + Estimated Read Time */}
				<div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
					<span>{formatDate(blog.publishedAt)}</span>
					<span className="text-neutral-700">•</span>
					<span>{blog.readTimeInMinutes} min read</span>
				</div>
			</div>
		</Link>
	);
};
