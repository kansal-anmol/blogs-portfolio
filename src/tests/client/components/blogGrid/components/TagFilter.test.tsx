import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TagFilter } from '@/src/client/components/blogGrid/components/TagFilter';
import { describe, expect, it, vi } from 'vitest';

const mockTags = ['React', 'TypeScript'];

describe('TagFilter', () => {
	it('renders All and other tag buttons, applying active styles to activeTag', () => {
		render(<TagFilter tags={mockTags} activeTag="All" onChange={() => {}} />);

		const allBtn = screen.getByRole('button', { name: 'All' });
		const reactBtn = screen.getByRole('button', { name: 'React' });
		const tsBtn = screen.getByRole('button', { name: 'TypeScript' });

		expect(allBtn).toBeInTheDocument();
		expect(reactBtn).toBeInTheDocument();
		expect(tsBtn).toBeInTheDocument();

		// All is active
		expect(allBtn).toHaveClass('bg-[#b5f542]');
		expect(reactBtn).toHaveClass('bg-[#1a1a1a]');
	});

	it('triggers onChange with the selected tag when clicked', async () => {
		const user = userEvent.setup();
		const mockOnChange = vi.fn();

		render(<TagFilter tags={mockTags} activeTag="All" onChange={mockOnChange} />);

		const reactBtn = screen.getByRole('button', { name: 'React' });
		await user.click(reactBtn);

		expect(mockOnChange).toHaveBeenCalledWith('React');
	});
});
