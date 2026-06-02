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
      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
        <FiSearch className="h-4.5 w-4.5" />
      </span>

      {/* Main Controlled Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles..."
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#222222] bg-[#111111] text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-[#b5f542] focus:shadow-[0_0_15px_rgba(181,245,66,0.06)] transition-all duration-300"
      />

      {/* Right Clear Icon Button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-white transition-colors duration-200"
          aria-label="Clear search"
        >
          <FiX className="h-4.5 w-4.5" />
        </button>
      )}
    </div>
  );
};
