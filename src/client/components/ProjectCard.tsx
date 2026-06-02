import React from 'react';
import type { UserProject } from '@/src/shared/types';

interface ProjectCardProps {
	project: UserProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	return (
		<div className="group flex flex-col overflow-hidden rounded-2xl border border-[#222222] bg-[#111111] transition-all duration-300 hover:border-[#b5f542] hover:shadow-[0_8px_30px_rgba(181,245,66,0.04)] md:flex-row">
			<div className="relative h-48 shrink-0 overflow-hidden border-b border-[#222222] bg-neutral-900 md:h-auto md:w-56 md:border-r md:border-b-0">
				{project.coverImage && (
					<img
						src={project.coverImage}
						alt={project.title}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
					/>
				)}
			</div>
			<div className="flex flex-grow flex-col justify-between gap-5 p-5">
				<div className="flex flex-col gap-2">
					<h4 className="font-heading text-lg font-bold text-white transition-colors group-hover:text-[#b5f542]">
						{project.title}
					</h4>
					<p className="font-body text-sm leading-relaxed text-neutral-400">
						{project.description}
					</p>
				</div>

				{/* Stack chips */}
				<div className="flex flex-wrap gap-1.5">
					{project.stack.map((tech) => (
						<span
							key={tech}
							className="rounded bg-[#222222] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#b5f542] uppercase"
						>
							{tech}
						</span>
					))}
				</div>

				{/* Action Buttons */}
				<div className="flex items-center gap-3">
					<a
						href={project.demoUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex-1 rounded-xl border border-transparent bg-[#b5f542] px-4 py-2 text-center text-xs font-semibold text-black shadow-sm transition-all duration-300 hover:border-[#b5f542] hover:bg-black hover:text-[#b5f542] sm:flex-initial"
					>
						Live Demo
					</a>
					<a
						href={project.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex-1 rounded-xl border border-[#222222] bg-[#222222] px-4 py-2 text-center text-xs font-semibold text-[#b5f542] transition-all duration-300 hover:border-[#b5f542] hover:bg-black sm:flex-initial"
					>
						Source Code
					</a>
				</div>
			</div>
		</div>
	);
};
