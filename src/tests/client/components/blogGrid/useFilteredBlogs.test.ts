import { renderHook, act } from '@testing-library/react';
import { useFilteredBlogs } from '@/src/client/components/blogGrid/useFilteredBlogs';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import type { Post } from '@/src/shared/types';

const mockBlogs: Post[] = [
	{
		id: '1',
		title: 'React Basics',
		slug: 'react-basics',
		brief: 'Learn React',
		publishedAt: '2026-06-11T12:00:00Z',
		readTimeInMinutes: 5,
		tags: [{ id: 't1', name: 'React', slug: 'react' }],
	},
	{
		id: '2',
		title: 'TypeScript Advanced',
		slug: 'ts-adv',
		brief: 'Learn TS',
		publishedAt: '2026-06-11T12:00:00Z',
		readTimeInMinutes: 8,
		tags: [{ id: 't2', name: 'TypeScript', slug: 'typescript' }],
	},
	{
		id: '3',
		title: 'React and TypeScript',
		slug: 'react-ts',
		brief: 'Learn both',
		publishedAt: '2026-06-11T12:00:00Z',
		readTimeInMinutes: 10,
		tags: [
			{ id: 't1', name: 'React', slug: 'react' },
			{ id: 't2', name: 'TypeScript', slug: 'typescript' },
		],
	},
];

const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem(key: string) {
			return store[key] || null;
		},
		setItem(key: string, value: string) {
			store[key] = value.toString();
		},
		clear() {
			store = {};
		},
		removeItem(key: string) {
			delete store[key];
		},
	};
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock, writable: true });
if (typeof window !== 'undefined') {
	Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });
}

describe('useFilteredBlogs', () => {
	beforeEach(() => {
		// Clear local storage and reset url
		window.localStorage.clear();
		window.history.pushState({}, '', '/');
	});

	afterEach(() => {
		window.localStorage.clear();
		window.history.pushState({}, '', '/');
	});

	it('returns default states and computes unique tags', () => {
		const { result } = renderHook(() => useFilteredBlogs(mockBlogs));

		expect(result.current.search).toBe('');
		expect(result.current.activeTag).toBe('All');
		expect(result.current.uniqueTags).toEqual(['React', 'TypeScript']);
		expect(result.current.filteredBlogs).toHaveLength(3);
		expect(result.current.paginatedBlogs).toHaveLength(3);
		expect(result.current.hasMore).toBe(false);
	});

	it('filters blogs by search query', () => {
		const { result } = renderHook(() => useFilteredBlogs(mockBlogs));

		act(() => {
			result.current.setSearch('Basics');
		});

		expect(result.current.filteredBlogs).toHaveLength(1);
		expect(result.current.filteredBlogs[0].title).toBe('React Basics');
	});

	it('filters blogs by active tag', () => {
		const { result } = renderHook(() => useFilteredBlogs(mockBlogs));

		act(() => {
			result.current.setActiveTag('TypeScript');
		});

		// Should match 'TypeScript Advanced' and 'React and TypeScript'
		expect(result.current.filteredBlogs).toHaveLength(2);
		expect(result.current.filteredBlogs.map((b) => b.title)).toContain('TypeScript Advanced');
		expect(result.current.filteredBlogs.map((b) => b.title)).toContain('React and TypeScript');
	});

	it('filters blogs by both search and active tag (AND logic)', () => {
		const { result } = renderHook(() => useFilteredBlogs(mockBlogs));

		act(() => {
			result.current.setSearch('React');
			result.current.setActiveTag('TypeScript');
		});

		// Should match 'React and TypeScript' but not 'React Basics' or 'TypeScript Advanced'
		expect(result.current.filteredBlogs).toHaveLength(1);
		expect(result.current.filteredBlogs[0].title).toBe('React and TypeScript');
	});

	it('loads initial active tag from URL query params', () => {
		window.history.pushState({}, '', '?tag=React');

		const { result } = renderHook(() => useFilteredBlogs(mockBlogs));

		expect(result.current.activeTag).toBe('React');
	});

	it('loads initial active tag from localStorage if URL parameter is missing', () => {
		window.localStorage.setItem('selected_tag', 'TypeScript');

		const { result } = renderHook(() => useFilteredBlogs(mockBlogs));

		expect(result.current.activeTag).toBe('TypeScript');
		expect(window.localStorage.getItem('selected_tag')).toBeNull(); // Should clear it
	});

	it('handles load more pagination correctly', () => {
		// Create 12 mock blogs to test pagination limit of 9
		const manyBlogs = Array.from({ length: 12 }, (_, i) => ({
			id: String(i),
			title: `Blog ${i}`,
			slug: `blog-${i}`,
			brief: `Brief ${i}`,
			publishedAt: '2026-06-11T12:00:00Z',
			readTimeInMinutes: 5,
			tags: [{ id: 't1', name: 'React', slug: 'react' }],
		}));

		const { result } = renderHook(() => useFilteredBlogs(manyBlogs));

		expect(result.current.filteredBlogs).toHaveLength(12);
		expect(result.current.paginatedBlogs).toHaveLength(9); // limit is 9 initially
		expect(result.current.hasMore).toBe(true);

		act(() => {
			result.current.handleLoadMore();
		});

		expect(result.current.paginatedBlogs).toHaveLength(12);
		expect(result.current.hasMore).toBe(false);
	});

	it('clears all filters when handleClearFilters is called', () => {
		const { result } = renderHook(() => useFilteredBlogs(mockBlogs));

		act(() => {
			result.current.setSearch('React');
			result.current.setActiveTag('React');
		});

		expect(result.current.filteredBlogs).toHaveLength(2);

		act(() => {
			result.current.handleClearFilters();
		});

		expect(result.current.search).toBe('');
		expect(result.current.activeTag).toBe('All');
		expect(result.current.filteredBlogs).toHaveLength(3);
	});
});
