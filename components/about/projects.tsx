import { type Project } from "@/components/about/constants/projects";
import { ProjectItem } from "./sections";

export function Projects({ projects }: { projects: Project[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{projects.map((project, index) => (
				<ProjectItem key={project._id} project={project} index={index} />
			))}
		</div>
	);
}
