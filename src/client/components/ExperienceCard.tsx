import type { UserExperience } from '@/src/shared/types';
import React from 'react';
import { FaCode } from 'react-icons/fa';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';

interface ExperienceCardProps {
	experience: UserExperience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
	return (
		<>
			{/* Company Title Header */}
			<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
				<div className="flex items-center gap-3">
					<div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#222222] bg-[#111111]">
						{experience.logo ? (
							<img
								src={experience.logo}
								alt={experience.company}
								className="h-full w-full object-cover"
							/>
						) : (
							<FaCode className="h-4 w-4 text-[#b5f542]" />
						)}
					</div>
					<div>
						<h4 className="font-heading text-md font-extrabold text-white">{experience.company}</h4>
						<p className="font-heading text-xs font-semibold tracking-wider text-[#b5f542] uppercase">
							{experience.role}
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-0.5 pl-11 text-xs font-medium text-neutral-500 sm:items-end sm:pl-0">
					<span className="flex items-center gap-1">
						<IoCalendarOutline />
						{experience.time}
					</span>
					<span className="flex items-center gap-1">
						<IoLocationOutline />
						{experience.location}
					</span>
				</div>
			</div>

			{/* Responsibilities list */}
			<ul className="flex list-disc flex-col gap-2 pl-12 text-sm leading-relaxed text-neutral-400">
				{experience.responsibilities.map((resp, i) => (
					<li key={i}>{resp}</li>
				))}
			</ul>
		</>
	);
};
