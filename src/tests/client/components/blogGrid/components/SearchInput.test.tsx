import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '@/src/client/components/blogGrid/components/SearchInput';
import { describe, expect, it, vi } from 'vitest';

describe('SearchInput', () => {
	it('renders with value and fires onChange on type', async () => {
		const user = userEvent.setup();
		const mockOnChange = vi.fn();

		render(<SearchInput value="" onChange={mockOnChange} />);

		const input = screen.getByPlaceholderText('Search articles...');
		expect(input).toBeInTheDocument();
		expect(input).toHaveValue('');

		await user.type(input, 'React');
		// onChange is called for each keystroke, let's verify last call or call count
		expect(mockOnChange).toHaveBeenCalled();
		expect(mockOnChange).toHaveBeenCalledWith('R');
	});

	it('renders clear button when value is present and fires onChange on click', async () => {
		const user = userEvent.setup();
		const mockOnChange = vi.fn();

		render(<SearchInput value="test" onChange={mockOnChange} />);

		const clearBtn = screen.getByRole('button', { name: /Clear search/i });
		expect(clearBtn).toBeInTheDocument();

		await user.click(clearBtn);
		expect(mockOnChange).toHaveBeenCalledWith('');
	});

	it('does not render clear button when value is empty', () => {
		render(<SearchInput value="" onChange={() => {}} />);
		expect(screen.queryByRole('button', { name: /Clear search/i })).not.toBeInTheDocument();
	});
});
