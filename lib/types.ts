import { Author, Post, PostTag, TableOfContentsItem } from '@/src/shared/types';
export type { Author, Post, PostTag, TableOfContentsItem };

export interface NavbarItem {
	id: string;
	label: string;
	url: string;
	type: string;
}

export interface Publication {
	id: string;
	title: string;
	displayTitle?: string | null;
	url: string;
	favicon?: string | null;
	descriptionSEO?: string | null;
	ogMetaData?: {
		image?: string | null;
	};
	preferences?: {
		logo?: string | null;
		darkMode?: {
			logo?: string | null;
		} | null;
		navbarItems?: NavbarItem[];
	};
	author: Author;
	links?: {
		twitter?: string | null;
		github?: string | null;
		linkedin?: string | null;
		hashnode?: string | null;
	};
	metaTags?: string | null;
}

export interface StaticPage {
	id: string;
	title: string;
	slug: string;
	content: {
		markdown: string;
	};
}
