import { render, screen } from '@testing-library/react';
import { BlogCard } from '@/src/client/components/BlogCard';
import { describe, expect, it } from 'vitest';
import type { Post } from '@/src/shared/types';

const mockBlog: Post = {
	id: '1',
	title: 'Test Blog Title',
	slug: 'test-blog-title',
	brief: 'Brief description',
	publishedAt: '2026-06-11T12:00:00Z',
	readTimeInMinutes: 5,
	coverImage: {
		url: 'https://example.com/cover.jpg',
	},
	tags: [{ id: 't1', name: 'React', slug: 'react' }],
};

describe('BlogCard', () => {
	it('renders blog card with title, date, tag and cover image', () => {
		render(<BlogCard blog={mockBlog} />);

		expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
		expect(screen.getByText('React')).toBeInTheDocument();
		expect(screen.getByText('Jun 11, 2026')).toBeInTheDocument();
		expect(screen.getByText('5 min read')).toBeInTheDocument();

		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg');
		expect(img).toHaveAttribute('alt', 'Test Blog Title');

		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/blog/test-blog-title');
	});

	it('renders default fallback tag when cover image and tags are missing', () => {
		const blogWithoutCover = {
			...mockBlog,
			coverImage: null,
			tags: [],
		};
		render(<BlogCard blog={blogWithoutCover} />);

		// Tag fallback 'Engineering' should render
		const engineeringTags = screen.getAllByText('Engineering');
		expect(engineeringTags.length).toBeGreaterThan(0);
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
	});
});
