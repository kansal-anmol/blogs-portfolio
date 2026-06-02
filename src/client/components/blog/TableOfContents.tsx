import { useState } from 'react';
import { IoCloseOutline, IoListOutline } from 'react-icons/io5';

type TocItem = {
	slug: string;
	title: string;
};

type TableOfContentsProps = {
	items: TocItem[];
	activeHeadingId: string;
};

const TocNav = ({
	items,
	activeHeadingId,
	onItemClick,
}: TableOfContentsProps & { onItemClick?: () => void }) => (
	<nav className="flex flex-col gap-3 border-l border-[#222222] pl-4">
		{items.map((item) => {
			const isActive = activeHeadingId === item.slug;
			return (
				<a
					key={item.slug}
					href={`#${item.slug}`}
					onClick={onItemClick}
					className={`font-heading text-xs leading-normal font-medium transition-all duration-300 ${
						isActive ? 'translate-x-0.5 text-[#b5f542]' : 'text-neutral-400 hover:text-white'
					}`}
				>
					{item.title}
				</a>
			);
		})}
	</nav>
);

const TocHeading = () => (
	<h3 className="font-heading text-xs font-bold tracking-wider text-neutral-500 uppercase select-none">
		Table of Contents
	</h3>
);

export const TableOfContents = ({ items, activeHeadingId }: TableOfContentsProps) => {
	const [isOpen, setIsOpen] = useState(false);

	if (!items || items.length === 0) return null;

	const toggleDrawer = () => setIsOpen(!isOpen);
	const closeDrawer = () => setIsOpen(false);

	return (
		<>
			{/* Desktop Sticky Sidebar - Shown on lg and larger screens */}
			<aside className="sticky top-28 hidden w-64 shrink-0 flex-col gap-6 lg:flex">
				<div className="flex flex-col gap-4">
					<TocHeading />
					<TocNav items={items} activeHeadingId={activeHeadingId} />
				</div>
			</aside>

			{/* Mobile Floating Action Button - Hidden on lg screens */}
			<button
				onClick={toggleDrawer}
				className="fixed right-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#222222] bg-[#111111]/90 text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-[#b5f542] hover:text-[#b5f542] active:scale-95 lg:hidden"
				aria-label="Open Table of Contents"
			>
				<IoListOutline className="h-6 w-6" />
			</button>

			{/* Mobile Drawer Backdrop overlay */}
			{isOpen && (
				<div
					onClick={closeDrawer}
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
				/>
			)}

			{/* Mobile Drawer Panel */}
			<div
				className={`fixed right-0 bottom-0 left-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-3xl border-t border-[#222222] bg-[#111111]/95 p-6 backdrop-blur-md transition-transform duration-300 ease-out lg:hidden ${
					isOpen ? 'translate-y-0' : 'translate-y-full'
				}`}
			>
				{/* Top bar drag/pull representation */}
				<div className="mx-auto mb-4 h-1 w-12 rounded-full bg-neutral-700 select-none" />

				<div className="mb-6 flex items-center justify-between">
					<TocHeading />
					<button
						onClick={closeDrawer}
						className="flex h-8 w-8 items-center justify-center rounded-full border border-[#222222] bg-[#1a1a1a] text-neutral-400 hover:text-white"
					>
						<IoCloseOutline className="h-5 w-5" />
					</button>
				</div>

				<div className="pb-8">
					<TocNav items={items} activeHeadingId={activeHeadingId} onItemClick={closeDrawer} />
				</div>
			</div>
		</>
	);
};
