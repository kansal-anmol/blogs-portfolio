export interface Author {
	id: string;
	name: string;
	username: string;
	profilePicture: string;
	bio?: {
		html: string;
	};
}

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
	publication?: {
		id: string;
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
	author?: Author;
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
