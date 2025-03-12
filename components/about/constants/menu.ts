export type MenuOption = {
	id: number;
	name: string;
	url: string;
};

export const MENU_OPTIONS: Array<MenuOption> = [
	{ id: 0, name: "Intro", url: "#intro" },
	{ id: 1, name: "About", url: "#about" },
	{ id: 5, name: "Blogs", url: "#blogs" },
	{ id: 4, name: "Projects", url: "#projects" },
	{ id: 2, name: "Skills", url: "#tech" },
	{ id: 3, name: "Experience", url: "#experience" },
];
