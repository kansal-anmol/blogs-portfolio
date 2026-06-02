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
    <div className="flex overflow-x-auto gap-2 py-2 scrollbar-none snap-x snap-mandatory w-full max-w-full">
      {allTags.map((tag) => {
        const isActive = tag === activeTag;
        return (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-300 snap-center ${
              isActive
                ? 'bg-[#b5f542] text-black border border-transparent shadow-[0_2px_10px_rgba(181,245,66,0.15)]'
                : 'bg-[#1a1a1a] text-neutral-400 border border-[#444444] hover:text-white hover:border-neutral-500'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};
