import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogGrid } from '@/src/client/components/blogGrid/BlogGrid';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import type { Post } from '@/src/shared/types';

const mockBlogs: Post[] = [
	{
		id: '1',
		title: 'React Introduction',
		slug: 'react-intro',
		brief: 'Learn React',
		publishedAt: '2026-06-11T12:00:00Z',
		readTimeInMinutes: 5,
		tags: [{ id: 't1', name: 'React', slug: 'react' }],
	},
	{
		id: '2',
		title: 'TypeScript Basics',
		slug: 'ts-basics',
		brief: 'Learn TS',
		publishedAt: '2026-06-11T12:00:00Z',
		readTimeInMinutes: 4,
		tags: [{ id: 't2', name: 'TypeScript', slug: 'typescript' }],
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

describe('BlogGrid', () => {
	beforeEach(() => {
		window.localStorage.clear();
		window.history.pushState({}, '', '/');
	});

	afterEach(() => {
		window.localStorage.clear();
		window.history.pushState({}, '', '/');
	});

	it('renders search input, tags, and initial blog list', () => {
		render(<BlogGrid blogs={mockBlogs} />);

		// Search input exists
		expect(screen.getByPlaceholderText('Search articles...')).toBeInTheDocument();

		// Tags exist
		expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'TypeScript' })).toBeInTheDocument();

		// Blog cards exist
		expect(screen.getByText('React Introduction')).toBeInTheDocument();
		expect(screen.getByText('TypeScript Basics')).toBeInTheDocument();
	});

	it('filters list when searching or clicking tag', async () => {
		const user = userEvent.setup();
		render(<BlogGrid blogs={mockBlogs} />);

		const searchInput = screen.getByPlaceholderText('Search articles...');

		// Search for TypeScript
		await user.type(searchInput, 'TypeScript');

		// Only TS blog should exist
		expect(screen.queryByText('React Introduction')).not.toBeInTheDocument();
		expect(screen.getByText('TypeScript Basics')).toBeInTheDocument();

		// Clear search
		const clearBtn = screen.getByRole('button', { name: /Clear search/i });
		await user.click(clearBtn);

		// Both should exist again
		expect(screen.getByText('React Introduction')).toBeInTheDocument();
		expect(screen.getByText('TypeScript Basics')).toBeInTheDocument();

		// Filter by tag React
		const reactTagBtn = screen.getByRole('button', { name: 'React' });
		await user.click(reactTagBtn);

		// Only React blog should exist
		expect(screen.getByText('React Introduction')).toBeInTheDocument();
		expect(screen.queryByText('TypeScript Basics')).not.toBeInTheDocument();
	});

	it('renders empty state when no blogs match, and allows clearing filters', async () => {
		const user = userEvent.setup();
		render(<BlogGrid blogs={mockBlogs} />);

		const searchInput = screen.getByPlaceholderText('Search articles...');
		await user.type(searchInput, 'NonExistentQuery');

		expect(screen.getByText('No blogs found')).toBeInTheDocument();

		// Clear filters button
		const clearFiltersBtn = screen.getByRole('button', { name: /Clear Filters/i });
		expect(clearFiltersBtn).toBeInTheDocument();

		await user.click(clearFiltersBtn);

		// Blogs should render again
		expect(screen.getByText('React Introduction')).toBeInTheDocument();
		expect(screen.getByText('TypeScript Basics')).toBeInTheDocument();
	});

	it('renders Load More pagination button when needed', async () => {
		const user = userEvent.setup();
		// Create 11 mock blogs
		const manyBlogs: Post[] = Array.from({ length: 11 }, (_, i) => ({
			id: String(i),
			title: `Blog Post ${i}`,
			slug: `blog-${i}`,
			brief: `Brief ${i}`,
			publishedAt: '2026-06-11T12:00:00Z',
			readTimeInMinutes: 5,
			tags: [],
		}));

		render(<BlogGrid blogs={manyBlogs} />);

		// Only 9 should be shown initially
		expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(9);

		const loadMoreBtn = screen.getByRole('button', { name: /Load More Articles/i });
		expect(loadMoreBtn).toBeInTheDocument();

		await user.click(loadMoreBtn);

		// Now all 11 should be shown
		expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(11);
		expect(screen.queryByRole('button', { name: /Load More Articles/i })).not.toBeInTheDocument();
	});
});
