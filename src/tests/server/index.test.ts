import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getUserData, getAllBlogs, getPostBySlug } from '@/src/server/index';
import fs from 'fs';

vi.mock('fs', () => {
	return {
		default: {
			existsSync: vi.fn(),
			readdirSync: vi.fn(),
			readFileSync: vi.fn(),
		},
		existsSync: vi.fn(),
		readdirSync: vi.fn(),
		readFileSync: vi.fn(),
	};
});

const mockPostContent = `---
id: test-post-id
title: Test Blog Post Title
brief: This is a test brief.
coverImage: /assets/test-cover.png
publishedAt: 2026-06-11T12:00:00Z
readTimeInMinutes: 6
tags:
  - React
  - TypeScript
---
# Welcome
Some introductory paragraph.

## Section One (H2)
First section body.

### Subsection One-One (H3)
Nested section body.

## Section Two (H2)
Second section body.
`;

describe('Server Data & Post Utilities', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe('getUserData', () => {
		it('returns the user configuration object', () => {
			const user = getUserData();
			expect(user).toBeDefined();
			expect(user.name).toBeDefined();
			expect(user.role).toBeDefined();
		});
	});

	describe('getAllBlogs', () => {
		it('returns empty array if directory does not exist', async () => {
			vi.mocked(fs.existsSync).mockReturnValue(false);
			const blogs = await getAllBlogs();
			expect(blogs).toEqual([]);
		});

		it('reads and parses MD files from posts directory correctly', async () => {
			vi.mocked(fs.existsSync).mockReturnValue(true);
			vi.mocked(fs.readdirSync as (path: string) => string[]).mockReturnValue(['post1.md', 'post2.md']);
			vi.mocked(fs.readFileSync).mockReturnValue(mockPostContent);

			const blogs = await getAllBlogs();

			expect(fs.readdirSync).toHaveBeenCalled();
			expect(blogs).toHaveLength(2);
			expect(blogs[0].id).toBe('test-post-id');
			expect(blogs[0].title).toBe('Test Blog Post Title');
			expect(blogs[0].slug).toBe('post1'); // based on filename slug
			expect(blogs[0].coverImage).toEqual({ url: '/assets/test-cover.png' });
			expect(blogs[0].tags).toEqual([
				{ id: 'React', name: 'React', slug: 'React' },
				{ id: 'TypeScript', name: 'TypeScript', slug: 'TypeScript' },
			]);
		});
	});

	describe('getPostBySlug', () => {
		it('returns null if file does not exist', async () => {
			vi.mocked(fs.existsSync).mockReturnValue(false);
			const post = await getPostBySlug('non-existent');
			expect(post).toBeNull();
		});

		it('parses post content, converts markdown to HTML, and generates correct TOC tree', async () => {
			vi.mocked(fs.existsSync).mockReturnValue(true);
			vi.mocked(fs.readFileSync).mockReturnValue(mockPostContent);

			const post = await getPostBySlug('test-post');

			expect(post).not.toBeNull();
			expect(post!.title).toBe('Test Blog Post Title');
			expect(post!.content!.markdown).toBe(mockPostContent.split('---\n')[2]); // markdown content

			// Check that markdown was compiled to HTML
			expect(post!.content!.html).toContain('<h1>Welcome</h1>');

			// Check table of contents generation
			const toc = post!.features?.tableOfContents;
			expect(toc).toBeDefined();
			expect(toc!.isEnabled).toBe(true);
			expect(toc!.items).toHaveLength(3); // Section One, Subsection One-One, Section Two

			const items = toc!.items;
			// Section One (H2)
			expect(items[0]).toEqual({
				id: 'heading-1',
				level: 2,
				slug: 'section-one-h2',
				title: 'Section One (H2)',
				parentId: null,
			});

			// Subsection One-One (H3) should point to Section One as parent
			expect(items[1]).toEqual({
				id: 'heading-2',
				level: 3,
				slug: 'subsection-one-one-h3',
				title: 'Subsection One-One (H3)',
				parentId: 'heading-1',
			});

			// Section Two (H2) should have no parent
			expect(items[2]).toEqual({
				id: 'heading-3',
				level: 2,
				slug: 'section-two-h2',
				title: 'Section Two (H2)',
				parentId: null,
			});
		});
	});
});
