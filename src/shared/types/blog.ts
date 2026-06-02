import { User } from './user';

export interface PostTag {
	id: string;
	name: string;
	slug: string;
}

export interface TableOfContentsItem {
	id: string;
	level: number;
	slug: string;
	title: string;
	parentId?: string | null;
}

export interface Post {
	id: string;
	title: string;
	slug: string;
	brief: string;
	subtitle?: string | null;
	url?: string | null;
	hasLatexInPost?: boolean | null;
	seo?: {
		title?: string | null;
		description?: string | null;
	} | null;
	ogMetaData?: {
		image?: string | null;
	} | null;
	coverImage?: {
		url: string;
	} | null;
	publishedAt: string;
	readTimeInMinutes: number;
	content?: {
		markdown: string;
		html: string;
	};
	tags?: PostTag[];
	author?: User;
	preferences?: {
		disableComments: boolean;
	};
	features?: {
		tableOfContents?: {
			isEnabled: boolean;
			items: TableOfContentsItem[];
		};
	};
}

export interface StaticPage {
	id: string;
	title: string;
	slug: string;
	content: {
		markdown: string;
	};
}
