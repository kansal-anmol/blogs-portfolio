import React from 'react';

// Components
import { BlogCard } from '../BlogCard';
import { SearchInput } from './components/SearchInput';
import { TagFilter } from './components/TagFilter';

// Hooks
import { useFilteredBlogs } from './useFilteredBlogs';

// Types
import { Post as Blog } from '@/src/shared/types';

interface BlogGridProps {
	blogs: Blog[];
}

export const BlogGrid: React.FC<BlogGridProps> = ({ blogs }) => {
	const {
		search,
		setSearch,
		activeTag,
		setActiveTag,
		uniqueTags,
		filteredBlogs,
		paginatedBlogs,
		handleClearFilters,
		handleLoadMore,
		hasMore,
	} = useFilteredBlogs(blogs);

	return (
		<div className="flex w-full flex-col gap-8">
			{/* Search and Filters Section */}
			<div className="flex w-full flex-col gap-4.5">
				<SearchInput value={search} onChange={setSearch} />
				<TagFilter tags={uniqueTags} activeTag={activeTag} onChange={setActiveTag} />
			</div>

			{/* Main Grid View */}
			{filteredBlogs.length > 0 ? (
				<div className="grid grid-cols-1 gap-6.5 sm:grid-cols-2 lg:grid-cols-3">
					{paginatedBlogs.map((blog) => (
						<BlogCard key={blog.id} blog={blog} />
					))}
				</div>
			) : (
				/* Styled Empty State */
				<div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-[#222222] bg-[#111111] px-6 py-16 text-center">
					<div className="flex flex-col gap-1.5">
						<h4 className="font-heading text-lg font-bold text-white">No blogs found</h4>
						<p className="max-w-md text-sm leading-relaxed text-neutral-400">
							We couldn't find any articles matching your search query{' '}
							<span className="font-semibold text-[#b5f542]">"{search || activeTag}"</span>. Try
							resetting your active tag selection or query text.
						</p>
					</div>
					<button
						onClick={handleClearFilters}
						className="rounded-xl border border-transparent bg-[#b5f542] px-5 py-2 text-xs font-semibold text-black transition-all duration-300 hover:border-[#b5f542] hover:bg-black hover:text-[#b5f542]"
					>
						Clear Filters
					</button>
				</div>
			)}

			{/* Pagination Load More Trigger */}
			{hasMore && (
				<div className="mt-6 flex justify-center">
					<button
						onClick={handleLoadMore}
						className="rounded-xl border border-[#222222] bg-[#111111] px-6 py-2.5 text-xs font-semibold text-[#b5f542] transition-all duration-300 hover:border-[#b5f542] hover:bg-black hover:shadow-[0_4px_20px_rgba(181,245,66,0.04)]"
					>
						Load More Articles
					</button>
				</div>
			)}
		</div>
	);
};
