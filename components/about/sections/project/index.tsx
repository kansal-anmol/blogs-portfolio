import { HeadingDivider } from '@/components/about/headingDivider';
import Link from 'next/link';

import { PROJECTS } from '@/components/about/constants';
import { Projects } from '@/components/about/projects';

export function ProjectsSection() {
	return (
		<section id="projects" className="mt-16">
			<HeadingDivider title="Projects" />

			<div className="mt-8 flex flex-col items-center gap-8 md:gap-14">
				<Projects projects={PROJECTS.slice(0, 3)} />

				<Link
					href="https://github.com/kansal-anmol"
					target="_blank"
					tabIndex={-1}
					className="hover:bg-blue-normal focus:ring-blue-normal relative inline-flex min-h-[40px] items-center justify-center rounded-md bg-blue-900 px-4 align-middle whitespace-nowrap text-white transition-colors duration-200 ease-linear focus:ring-1"
					aria-label="more projects"
				>
					more projects
				</Link>
			</div>
		</section>
	);
}
