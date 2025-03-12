import Link from "next/link";
import { HeadingDivider } from "@/components/about/headingDivider";


import { Projects } from "@/components/about/projects";
import { PROJECTS, } from "@/components/about/constants";

export function ProjectsSection() {
	return (
		<section id="projects" className="mt-16">
			<HeadingDivider title="Projects" />

			<div className="flex flex-col items-center gap-8 md:gap-14 mt-8">
				<Projects projects={PROJECTS.slice(0, 3)} />

				<Link
					href="https://github.com/kansalanmol0609"
					target="_blank"
					tabIndex={-1}
					className="min-h-[40px] px-4 rounded-md bg-blue-900 text-white inline-flex items-center justify-center whitespace-nowrap align-middle transition-colors duration-200 ease-linear relative hover:bg-blue-normal  focus:ring-1 focus:ring-blue-normal"
					aria-label="more projects"
				>
					more projects
				</Link>
			</div>
		</section>
	);
}
