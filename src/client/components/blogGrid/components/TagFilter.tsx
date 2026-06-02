import React from 'react';

interface TagFilterProps {
	tags: string[];
	activeTag: string;
	onChange: (tag: string) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({ tags, activeTag, onChange }) => {
	// Ensure "All" is pre-pended to the unique tag lists
	const allTags = ['All', ...tags];

	return (
		<div className="flex w-full max-w-full snap-x snap-mandatory scrollbar-none gap-2 overflow-x-auto py-2">
			{allTags.map((tag) => {
				const isActive = tag === activeTag;
				return (
					<button
						key={tag}
						onClick={() => onChange(tag)}
						className={`shrink-0 snap-center rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
							isActive
								? 'border border-transparent bg-[#b5f542] text-black shadow-[0_2px_10px_rgba(181,245,66,0.15)]'
								: 'border border-[#444444] bg-[#1a1a1a] text-neutral-400 hover:border-neutral-500 hover:text-white'
						}`}
					>
						{tag}
					</button>
				);
			})}
		</div>
	);
};
