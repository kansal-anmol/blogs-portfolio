import { useEffect, useMemo, useState } from 'react';
import { Post as Blog } from '@/src/shared/types';

export const useFilteredBlogs = (blogs: Blog[]) => {
	const [search, setSearch] = useState('');
	const [activeTag, setActiveTag] = useState('All');
	const [visibleCount, setVisibleCount] = useState(9);

	// Extract all unique tags dynamically from blog frontmatter
	const uniqueTags = useMemo(() => {
		const allTags = blogs.flatMap((b) => b.tags?.map((t) => t.name) || []);
		return Array.from(new Set(allTags)).sort();
	}, [blogs]);

	// Load selected tag from URL query params or localStorage backup
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const queryTag = params.get('tag');
		const savedTag = localStorage.getItem('selected_tag');

		if (queryTag) {
			const matched = uniqueTags.find((t) => t.toLowerCase() === queryTag.toLowerCase());
			if (matched) {
				setActiveTag(matched);
			}
			localStorage.removeItem('selected_tag');
		} else if (savedTag) {
			const matched = uniqueTags.find((t) => t.toLowerCase() === savedTag.toLowerCase());
			if (matched) {
				setActiveTag(matched);
			}
			localStorage.removeItem('selected_tag');
		}
	}, [uniqueTags]);

	// Composed AND logic filtering
	const filteredBlogs = useMemo(() => {
		return blogs.filter((blog) => {
			const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
			const matchesTag =
				activeTag === 'All' ||
				blog.tags?.some((t) => t.name.toLowerCase() === activeTag.toLowerCase());
			return matchesSearch && matchesTag;
		});
	}, [blogs, search, activeTag]);

	// Paginated visible slice of blogs
	const paginatedBlogs = useMemo(() => {
		return filteredBlogs.slice(0, visibleCount);
	}, [filteredBlogs, visibleCount]);

	// Reset all filters helper
	const handleClearFilters = () => {
		setSearch('');
		setActiveTag('All');
		setVisibleCount(9);
	};

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + 9);
	};

	const hasMore = filteredBlogs.length > visibleCount;

	return {
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
	};
};
