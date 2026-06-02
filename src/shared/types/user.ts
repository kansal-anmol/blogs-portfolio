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
	profilePicture: string;
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
