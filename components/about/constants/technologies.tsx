import { AiFillHtml5, AiFillGithub, AiFillGitlab } from "react-icons/ai";
import { DiCss3, DiVisualstudio } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb";
import {
	SiTypescript,
	SiApollographql,
	SiRedux,
	SiJest,
	SiTestinglibrary,
	SiPrisma,
	SiMongodb,
	SiPlanetscale,
	SiGraphql,
	SiExpress,
	SiDocker,
	SiCplusplus,
	SiJira,
	SiChakraui
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa6";

export const TECHNOLOGIES = [
	{
		category: "Frontend",
		items: [
			{ name: "HTML", icon: <AiFillHtml5 size={28} /> },
			{ name: "CSS", icon: <DiCss3 size={28} /> },
			{ name: "Tailwind CSS", icon: <TbBrandTailwind size={28} /> },
			{ name: "Chakra", icon: <SiChakraui width={28} /> },
			{ name: "JavaScript", icon: <IoLogoJavascript size={28} /> },
			{ name: "TypeScript", icon: <SiTypescript size={28} /> },
			{ name: "React", icon: <FaReact size={28} /> },
			{ name: "Redux", icon: <SiRedux size={28} /> },
			{ name: "Jest", icon: <SiJest size={28} /> },
			{ name: "React Testing Library", icon: <SiTestinglibrary size={28} /> },
			{ name: "Next", icon: <TbBrandNextjs size={28} /> },
			{ name: "GraphQL", icon: <SiApollographql size={28} /> }
		]
	},
	{
		category: "Backend",
		items: [
			{ name: "NodeJs", icon: <FaNodeJs size={28} /> },
			{ name: "Prisma", icon: <SiPrisma size={28} /> },
			{ name: "MongoDB", icon: <SiMongodb size={28} /> },
			{ name: "TypeScript", icon: <SiTypescript size={28} /> },
			{ name: "PlanetScale", icon: <SiPlanetscale size={28} /> },
			{ name: "GraphQL", icon: <SiGraphql size={28} /> },
			{ name: "Express.JS", icon: <SiExpress size={28} /> },
			{ name: "Jest", icon: <SiJest size={28} /> }
		]
	},

	{
		category: "Other languages & tools",
		items: [
			{ name: "C++", icon: <SiCplusplus width={28} /> },
			{ name: "Jira", icon: <SiJira width={28} /> },
			{ name: "Github", icon: <AiFillGithub size={28} /> },
			{ name: "Gitlab", icon: <AiFillGitlab size={28} /> },
			{ name: "VsCode", icon: <DiVisualstudio size={28} /> },
			{ name: "Docker", icon: <SiDocker size={28} /> }
		]
	}
];
