import React, { useState, useMemo, useEffect } from 'react';
import { Post } from '@/lib/types';
import { SearchInput } from './SearchInput';
import { TagFilter } from './TagFilter';
import { BlogCard } from './BlogCard';

interface BlogGridProps {
  posts: Post[];
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);

  // Extract all unique tags dynamically from post frontmatter
  const uniqueTags = useMemo(() => {
    const allTags = posts.flatMap((p) => p.tags?.map((t) => t.name) || []);
    return Array.from(new Set(allTags)).sort();
  }, [posts]);

  // Load selected tag from URL query params or localStorage backup
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryTag = params.get('tag');
    const savedTag = localStorage.getItem('selected_tag');

    if (queryTag) {
      const matched = uniqueTags.find(
        (t) => t.toLowerCase() === queryTag.toLowerCase()
      );
      if (matched) {
        setActiveTag(matched);
      }
      localStorage.removeItem('selected_tag');
    } else if (savedTag) {
      const matched = uniqueTags.find(
        (t) => t.toLowerCase() === savedTag.toLowerCase()
      );
      if (matched) {
        setActiveTag(matched);
      }
      localStorage.removeItem('selected_tag');
    }
  }, [uniqueTags]);

  // Composed AND logic filtering
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
      const matchesTag =
        activeTag === 'All' ||
        post.tags?.some((t) => t.name.toLowerCase() === activeTag.toLowerCase());
      return matchesSearch && matchesTag;
    });
  }, [posts, search, activeTag]);

  // Paginated visible slice of posts
  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  // Reset all filters helper
  const handleClearFilters = () => {
    setSearch('');
    setActiveTag('All');
    setVisibleCount(9);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const hasMore = filteredPosts.length > visibleCount;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Search and Filters Section */}
      <div className="flex flex-col gap-4.5 w-full">
        <SearchInput value={search} onChange={setSearch} />
        <TagFilter tags={uniqueTags} activeTag={activeTag} onChange={setActiveTag} />
      </div>

      {/* Main Grid View */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.5">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        /* Styled Empty State */
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-[#222222] bg-[#111111] rounded-2xl gap-5">
          <div className="flex flex-col gap-1.5">
            <h4 className="font-heading font-bold text-lg text-white">No posts found</h4>
            <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
              We couldn't find any articles matching your search query{' '}
              <span className="text-[#b5f542] font-semibold">"{search || activeTag}"</span>. 
              Try resetting your active tag selection or query text.
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#b5f542] text-black border border-transparent hover:bg-black hover:text-[#b5f542] hover:border-[#b5f542] transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination Load More Trigger */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#111111] text-[#b5f542] border border-[#222222] hover:border-[#b5f542] hover:bg-black transition-all duration-300 hover:shadow-[0_4px_20px_rgba(181,245,66,0.04)]"
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};
