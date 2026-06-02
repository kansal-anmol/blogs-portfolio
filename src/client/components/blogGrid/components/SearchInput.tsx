import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
	return (
		<div className="relative w-full md:w-[400px]">
			{/* Left Search Icon */}
			<span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
				<FiSearch className="h-4.5 w-4.5" />
			</span>

			{/* Main Controlled Input */}
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Search articles..."
				className="w-full rounded-xl border border-[#222222] bg-[#111111] py-2.5 pr-10 pl-10 text-sm text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:border-[#b5f542] focus:shadow-[0_0_15px_rgba(181,245,66,0.06)] focus:outline-none"
			/>

			{/* Right Clear Icon Button */}
			{value && (
				<button
					onClick={() => onChange('')}
					className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 transition-colors duration-200 hover:text-white"
					aria-label="Clear search"
				>
					<FiX className="h-4.5 w-4.5" />
				</button>
			)}
		</div>
	);
};
