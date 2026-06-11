import { render, screen } from '@testing-library/react';
import { RelatedBlogs } from '@/src/client/components/blog/RelatedBlogs';
import { describe, expect, it } from 'vitest';
import type { Post } from '@/src/shared/types';

const mockBlogs: Post[] = [
	{
		id: '1',
		title: 'Related Blog 1',
		slug: 'related-blog-1',
		brief: 'Learn related thing 1',
		publishedAt: '2026-06-11T12:00:00Z',
		readTimeInMinutes: 3,
		tags: [],
	},
	{
		id: '2',
		title: 'Related Blog 2',
		slug: 'related-blog-2',
		brief: 'Learn related thing 2',
		publishedAt: '2026-06-11T12:00:00Z',
		readTimeInMinutes: 4,
		tags: [],
	},
];

describe('RelatedBlogs', () => {
	it('returns null when empty blogs list is provided', () => {
		const { container } = render(<RelatedBlogs blogs={[]} />);
		expect(container.firstChild).toBeNull();
	});

	it('renders section and blog cards when blogs are provided', () => {
		render(<RelatedBlogs blogs={mockBlogs} />);

		expect(screen.getByRole('heading', { name: 'More blogs' })).toBeInTheDocument();
		expect(screen.getByText('Related Blog 1')).toBeInTheDocument();
		expect(screen.getByText('Related Blog 2')).toBeInTheDocument();
	});
});
