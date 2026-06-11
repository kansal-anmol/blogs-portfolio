import { render, screen } from '@testing-library/react';
import { BlogHeader } from '@/src/client/components/blog/BlogHeader';
import { describe, expect, it, vi } from 'vitest';
import type { Post } from '@/src/shared/types';

const mockBlog: Post = {
	id: '1',
	title: 'Writing Tests',
	slug: 'writing-tests',
	brief: 'Learn writing tests',
	publishedAt: '2026-06-11T12:00:00Z',
	readTimeInMinutes: 7,
	coverImage: {
		url: 'https://example.com/cover.jpg',
	},
	author: {
		name: 'Anmol Kansal',
		profilePicture: '/assets/profile.png',
	} as any,
};

const mockFormatDate = vi.fn((dateStr: string) => 'June 11, 2026');

describe('BlogHeader', () => {
	it('renders blog header correctly with cover image and author meta', () => {
		render(<BlogHeader blog={mockBlog} formatDate={mockFormatDate} />);

		expect(screen.getByRole('heading', { name: 'Writing Tests' })).toBeInTheDocument();
		expect(mockFormatDate).toHaveBeenCalledWith('2026-06-11T12:00:00Z');
		expect(screen.getByText('June 11, 2026')).toBeInTheDocument();
		expect(screen.getByText('Anmol Kansal')).toBeInTheDocument();
		expect(screen.getByText('7 min read')).toBeInTheDocument();

		const imgs = screen.getAllByRole('img');
		// There should be 2 images: one cover image, one author picture
		expect(imgs.length).toBe(2);
		expect(imgs[0]).toHaveAttribute('src', 'https://example.com/cover.jpg');
		expect(imgs[0]).toHaveAttribute('alt', 'Writing Tests');
		expect(imgs[1]).toHaveAttribute('src', '/assets/profile.png');
		expect(imgs[1]).toHaveAttribute('alt', 'Anmol Kansal');
	});

	it('renders without cover image if cover image is missing', () => {
		const blogWithoutCover = {
			...mockBlog,
			coverImage: null,
		};
		render(<BlogHeader blog={blogWithoutCover} formatDate={mockFormatDate} />);

		const imgs = screen.getAllByRole('img');
		// Should only have the author picture
		expect(imgs.length).toBe(1);
		expect(imgs[0]).toHaveAttribute('src', '/assets/profile.png');
	});
});
