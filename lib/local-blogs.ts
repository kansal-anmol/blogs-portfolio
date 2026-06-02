import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { getPublicationData } from './local-publication';
import { Post, TableOfContentsItem } from './types';

const POSTS_DIRECTORY = path.join(process.cwd(), '_posts');

function parseTableOfContents(markdown: string): TableOfContentsItem[] {
	const headingRegex = /^(#{2,6})\s+(.+)$/gm;
	const items: TableOfContentsItem[] = [];
	let match;
	let index = 1;
	const lastHeadingByLevel: { [key: number]: string } = {};

	while ((match = headingRegex.exec(markdown)) !== null) {
		const level = match[1].length;
		const rawTitle = match[2].trim().replace(/\*+/g, '').replace(/`+/g, '');
		const slug = rawTitle
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-');

		const id = `heading-${index}`;

		// Find parent: the closest preceding heading with level < current level
		let parentId: string | null = null;
		for (let l = level - 1; l >= 2; l--) {
			if (lastHeadingByLevel[l]) {
				parentId = lastHeadingByLevel[l];
				break;
			}
		}

		items.push({
			id,
			level,
			slug,
			title: rawTitle,
			parentId,
		});

		lastHeadingByLevel[level] = id;
		for (let l = level + 1; l <= 6; l++) {
			delete lastHeadingByLevel[l];
		}

		index++;
	}
	return items;
}

interface LocalPost {
	id: string;
	title: string;
	slug: string;
	brief: string;
	coverImage: string;
	publishedAt: string;
	updatedAt?: string;
	readTimeInMinutes: number;
	tags: string[];
	content: string;
}

// Convert markdown to HTML string
async function markdownToHtmlString(markdown: string): Promise<string> {
	const result = await remark().use(html).process(markdown);
	return result.toString();
}

// Read markdown files and parse frontmatter
async function getPostFromMDFile(fileName: string): Promise<LocalPost> {
	const slug = fileName.replace(/\.md$/, '');
	const filePath = path.join(POSTS_DIRECTORY, fileName);
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContents);

	return {
		id: data.id || slug,
		title: data.title || 'Untitled Post',
		slug,
		brief: data.brief || content.slice(0, 160).replace(/\r?\n|\r/g, ' ') + '...',
		coverImage: data.coverImage || '',
		publishedAt: data.publishedAt || new Date().toISOString(),
		updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString(),
		readTimeInMinutes:
			data.readTimeInMinutes || Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
		tags: Array.isArray(data.tags) ? data.tags : [],
		content,
	};
}

export async function getAllPosts(): Promise<Post[]> {
	if (!fs.existsSync(POSTS_DIRECTORY)) {
		return [];
	}
	const fileNames = fs.readdirSync(POSTS_DIRECTORY);
	const postsPromises = fileNames
		.filter((fileName) => fileName.endsWith('.md'))
		.map(async (fileName) => {
			const localPost = await getPostFromMDFile(fileName);
			const publication = getPublicationData();
			return {
				id: localPost.id,
				title: localPost.title,
				slug: localPost.slug,
				brief: localPost.brief,
				coverImage: localPost.coverImage ? { url: localPost.coverImage } : null,
				publishedAt: localPost.publishedAt,
				readTimeInMinutes: localPost.readTimeInMinutes,
				author: {
					id: publication.author.id,
					name: publication.author.name,
					username: publication.author.username,
					profilePicture: publication.author.profilePicture,
				},
				tags: localPost.tags.map((tag) => ({
					id: tag,
					name: tag,
					slug: tag,
				})),
			} as Post;
		});

	const posts = await Promise.all(postsPromises);
	// Sort posts by date descending
	return posts.sort(
		(a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
	);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	const fileName = `${slug}.md`;
	const filePath = path.join(POSTS_DIRECTORY, fileName);
	if (!fs.existsSync(filePath)) {
		return null;
	}

	const localPost = await getPostFromMDFile(fileName);
	const publication = getPublicationData();
	const htmlContent = await markdownToHtmlString(localPost.content);

	const mappedTags = localPost.tags.map((tag) => ({
		id: tag,
		name: tag,
		slug: tag,
	}));

	const tocItems = parseTableOfContents(localPost.content);

	return {
		id: localPost.id,
		slug: localPost.slug,
		brief: localPost.brief,
		title: localPost.title,
		publishedAt: localPost.publishedAt,
		readTimeInMinutes: localPost.readTimeInMinutes,
		coverImage: localPost.coverImage ? { url: localPost.coverImage } : null,
		author: {
			id: publication.author.id,
			name: publication.author.name,
			username: publication.author.username,
			profilePicture: publication.author.profilePicture,
			bio: {
				html: publication.author.bio?.html || '',
			},
		},
		content: {
			markdown: localPost.content,
			html: htmlContent,
		},
		tags: mappedTags,
		preferences: {
			disableComments: true,
		},
		features: {
			tableOfContents: {
				isEnabled: tocItems.length > 0,
				items: tocItems,
			},
		},
	};
}
