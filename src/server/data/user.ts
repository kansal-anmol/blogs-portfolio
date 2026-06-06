import type { User } from '@/src/shared/types';

export const USER: User = {
	name: 'Anmol Kansal',
	role: 'Full Stack Developer',
	gender: 'male',
	pronouns: ['he', 'him', 'his'],
	company: 'D.E. Shaw India',
	shortIntro:
		'Hello! I am Anmol Kansal, a Full Stack Developer with close to 5 years of experience. I specialize in React, TypeScript, and state-of-the-art web architectures — designing scalable frontend infrastructures and bringing visual experiences to life.',
	bio: 'I have close to 5 years of industry experience building scalable web interfaces and robust frontend infrastructures. I specialize in React, TypeScript, Next.js, and full-stack JavaScript — with a strong focus on clean code, performant bundle loading, and highly optimized animation layers.',
	profilePicture: '/assets/profile.png',
	capabilities: [
		{
			id: 'frontend',
			label: 'Frontend',
			values: [
				'React',
				'TypeScript',
				'Next.js',
				'Redux',
				'Chakra UI',
				'GraphQL',
				'Tailwind CSS',
				'HTML5',
				'CSS3',
			],
		},
		{
			id: 'backend',
			label: 'Backend',
			values: ['Node.js', 'Prisma', 'MongoDB', 'PlanetScale', 'Express', 'Jest'],
		},
		{
			id: 'toolsAndLangs',
			label: 'Tools & Langs',
			values: ['C++', 'Docker', 'Git', 'Jira', 'VS Code'],
		},
	],
	experiences: [
		{
			id: '0',
			role: 'Lead, Tech',
			time: 'January, 2026 - Present',
			company: 'D. E. Shaw India',
			location: 'Gurugram, India',
			logo: '/assets/d_e_shaw_india_private_limited_logo.jpeg',
			companyDescription:
				'The D. E. Shaw group is a global investment and technology development firm with more than $60 billion in investment capital.',
			responsibilities: [
				'Working as a part of the DJS Infra team focused on building scalable and robust web infrastructure supporting 200+ production web applications firm-wide.',
			],
		},
		{
			id: '1',
			role: 'Senior Member, Tech',
			time: 'May, 2024 - December, 2025',
			company: 'D. E. Shaw India',
			location: 'Hyderabad, India',
			logo: '/assets/d_e_shaw_india_private_limited_logo.jpeg',
			responsibilities: [
				'Worked as a part of the DJS Infra team focused on building scalable and robust web infrastructure supporting 200+ production web applications firm-wide.',
			],
		},
		{
			id: '2',
			role: 'Senior Product Engineer',
			time: 'April, 2023 - May, 2024',
			company: 'Sprinklr',
			location: 'Gurugram, India',
			logo: '/assets/sprinklr_logo.jpeg',
			responsibilities: [
				'Maintained a single page application (SPA) having 30+ routes by working in collaboration with Backend Developers, Product Managers and Designers etc.',
				'Languages and Tools - HTML, CSS, JavaScript, TypeScript, ReactJS, Next, Jest, Redux, Apollo GraphQL Client, Git etc.',
				'Provided mentorship to two new team members, facilitating their successful onboarding and contributing to their professional development within the organization.',
				'Top performer for major release of Distributed platform in Q2, Q3 and Q4 2023.',
				"Added bulk actions support in the contacts' module of Distributed platform.",
			],
		},
		{
			id: '3',
			role: 'Product Engineer',
			time: 'June, 2021 - March, 2023',
			company: 'Sprinklr',
			location: 'Gurugram, India',
			logo: '/assets/sprinklr_logo.jpeg',
			responsibilities: [
				'Reduced Docker Image Size by 30% (approximately 1.53 GB).',
				'Integrated Stack Exchange and Stack Overflow channels in Distributed platform.',
				'Added Translate action for inbound, outbound, suggestion and universal case messages in Distributed platform.',
				'Added react-virtualized components which resulted in achieving a smooth 60FPS scrolling experience for infinite lists.',
				'Incorporated Sentry for real-time error tracking and performance monitoring in Production, ensuring proactive issue identification.',
			],
		},
		{
			id: '4',
			role: 'Product Engineering Intern',
			time: 'May, 2020 - June, 2020',
			company: 'Sprinklr',
			location: 'Gurugram, India',
			logo: '/assets/sprinklr_logo.jpeg',
			responsibilities: [
				'Developed the Actions Config Builder tool to automate the generation of experience configs for message actions.',
				'This resulted in significantly reducing the workload for both developers and testers and streamlining the configuration process (approx 20%).',
			],
		},
	],
	projects: [
		{
			title: 'Perfecto',
			description:
				'A full-stack restaurant app featuring order placement, tracking, table booking, and admin management dashboard.',
			coverImage: '/assets/projects/perfecto/home_page.png',
			stack: ['TypeScript', 'React', 'Next.js', 'Chakra UI', 'GraphQL', 'Node.js', 'Prisma'],
			demoUrl: 'https://perfecto.vercel.app/',
			sourceUrl: 'https://github.com/kansal-anmol/perfecto',
		},
		{
			title: 'Chess Cube',
			description:
				'An online multiplayer chess game using chess.js, socket.io and chessboard API managing complex real-time interactive states.',
			coverImage: '/assets/projects/chessCube/home_page.png',
			stack: ['JavaScript', 'Node.js', 'Socket.io', 'Semantic UI'],
			demoUrl: 'https://online-multiplayer-chess-seven.vercel.app/',
			sourceUrl: 'https://github.com/kansal-anmol/Online-Multiplayer-Chess',
		},
		{
			title: 'Medium Clone',
			description:
				'A functional clone of Medium using React, Next.js, and Sanity.io CMS with commenting and post generation mechanics.',
			coverImage: '/assets/projects/mediumClone/home_page.png',
			stack: ['React', 'Next.js', 'TailwindCSS', 'Sanity.io', 'GraphQL'],
			demoUrl: 'https://medium-clone-jet-phi.vercel.app/',
			sourceUrl: 'https://github.com/kansal-anmol/medium-clone',
		},
	],
	skillGroups: [
		{
			category: 'Frontend',
			skills: [
				'React',
				'TypeScript',
				'Next.js',
				'Tailwind CSS',
				'Chakra UI',
				'Redux',
				'GraphQL',
				'JavaScript',
				'HTML',
				'CSS',
			],
		},
		{
			category: 'Backend',
			skills: ['Node.js', 'Prisma', 'MongoDB', 'Express', 'GraphQL', 'Jest'],
		},
		{
			category: 'Tools & Languages',
			skills: ['C++', 'Docker', 'GitHub', 'Jira', 'VS Code'],
		},
	],
	achievements: [
		'Secured an All India Rank of 3743 in JEE Mains 2017 out of 1.3 Million students.',
		'CodeForces Max Rating: 1742 (Expert)',
		'CodeChef Max Rating: 1890 (4 Star)',
		'Achieved 817 Global Rank in Google Kickstart Round B, 2020',
	],
	socials: [
		{
			name: 'GitHub',
			url: 'https://github.com/kansal-anmol',
			username: 'kansal-anmol',
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/kansal-anmol/',
			username: 'kansal-anmol',
		},
		{
			name: 'Hashnode',
			url: 'https://hashnode.com/@kansalanmol0609',
			username: 'kansalanmol0609',
		},
	],
	education: [
		{
			id: '0',
			degree: 'B.E. in Information Technology',
			school: 'Netaji Subhas Institute of Technology, Delhi',
			time: '2017 - 2021',
			score: '9.14 CGPA',
		},
	],
};
