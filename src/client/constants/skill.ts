import { IconType } from 'react-icons';
import { DiVisualstudio } from 'react-icons/di';
import { FaCss3Alt, FaDocker, FaGithub, FaHtml5, FaNodeJs, FaReact } from 'react-icons/fa';
import {
	SiChakraui,
	SiCplusplus,
	SiExpress,
	SiGraphql,
	SiJavascript,
	SiJest,
	SiJira,
	SiMongodb,
	SiNextdotjs,
	SiPrisma,
	SiRedux,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si';

export const SKILL_VS_ICON: Record<string, IconType> = {
	React: FaReact,
	TypeScript: SiTypescript,
	'Next.js': SiNextdotjs,
	'Tailwind CSS': SiTailwindcss,
	'Chakra UI': SiChakraui,
	Redux: SiRedux,
	GraphQL: SiGraphql,
	JavaScript: SiJavascript,
	HTML: FaHtml5,
	CSS: FaCss3Alt,
	'Node.js': FaNodeJs,
	Prisma: SiPrisma,
	MongoDB: SiMongodb,
	Express: SiExpress,
	Jest: SiJest,
	'C++': SiCplusplus,
	Docker: FaDocker,
	GitHub: FaGithub,
	Jira: SiJira,
	'VS Code': DiVisualstudio,
};
