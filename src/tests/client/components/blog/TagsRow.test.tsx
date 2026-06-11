import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TagsRow } from '@/src/client/components/blog/TagsRow';
import { describe, expect, it, vi } from 'vitest';
import type { PostTag } from '@/src/shared/types';

const mockTags: PostTag[] = [
	{ id: 't1', name: 'React', slug: 'react' },
	{ id: 't2', name: 'Testing', slug: 'testing' },
];

describe('TagsRow', () => {
	it('returns null when empty or undefined tags are provided', () => {
		const { container, rerender } = render(<TagsRow tags={[]} />);
		expect(container.firstChild).toBeNull();

		rerender(<TagsRow tags={undefined} />);
		expect(container.firstChild).toBeNull();
	});

	it('renders list of tag buttons and triggers onClick when clicked', async () => {
		const user = userEvent.setup();
		const mockOnClick = vi.fn();

		render(<TagsRow tags={mockTags} onClick={mockOnClick} />);

		const reactBtn = screen.getByRole('button', { name: '#React' });
		const testingBtn = screen.getByRole('button', { name: '#Testing' });

		expect(reactBtn).toBeInTheDocument();
		expect(testingBtn).toBeInTheDocument();

		await user.click(reactBtn);
		expect(mockOnClick).toHaveBeenCalledWith(mockTags[0]);
	});
});
