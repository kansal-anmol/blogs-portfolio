import type { PostTag } from '@/src/shared/types';

type Props = {
	tags?: PostTag[];
	onClick?: (tag: PostTag) => void;
};

export const TagsRow = ({ tags, onClick }: Props) => {
	if (!tags || tags.length === 0) return null;

	return (
		<div className="mt-12 flex flex-wrap gap-2.5 select-none">
			{tags.map((t) => (
				<button
					key={t.slug}
					onClick={() => onClick?.(t)}
					className={`inline-block rounded-lg border border-[#222222] bg-[#111111] px-3.5 py-1.5 text-xs font-medium text-neutral-300 ${
						onClick
							? 'cursor-pointer transition-colors duration-300 hover:border-[#b5f542] hover:text-[#b5f542] hover:shadow-[0_0_10px_rgba(181,245,66,0.1)]'
							: ''
					}`}
				>
					#{t.name}
				</button>
			))}
		</div>
	);
};
