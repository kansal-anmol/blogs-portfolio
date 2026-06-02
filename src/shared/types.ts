export interface UserExperience {
	id: string;
	role: string;
	time: string;
	company: string;
	location: string;
	logo: string;
	companyDescription?: string;
	responsibilities: string[];
}

export interface UserProject {
	title: string;
	description: string;
	coverImage?: string;
	stack: string[];
	demoUrl: string;
	sourceUrl: string;
}

export interface UserCapability {
	id: string;
	label: string;
	values: string[];
}

export interface UserSocial {
	name: string;
	url: string;
	username: string;
}

export interface UserEducation {
	id: string;
	degree: string;
	school: string;
	time: string;
	score: string;
}

export interface User {
	name: string;
	role: string;
	company: string;
	shortIntro: string;
	bio: string;
	capabilities: UserCapability[];
	experiences: UserExperience[];
	projects: UserProject[];
	socials: UserSocial[];
	skillGroups: {
		category: string;
		skills: string[];
	}[];
	achievements: string[];
	education: UserEducation[];
}

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
