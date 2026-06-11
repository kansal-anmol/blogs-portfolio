import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TerminalInput } from '@/src/client/components/terminal/components/TerminalInput';
import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

describe('TerminalInput', () => {
	it('renders prompt details and handles text inputs and key downs', async () => {
		const user = userEvent.setup();
		const mockSetInput = vi.fn();
		const mockHandleKeyDown = vi.fn();
		const ref = createRef<HTMLInputElement>();

		render(
			<TerminalInput
				username="guest"
				hostname="portfolio"
				prompt="$"
				input="ls -la"
				setInput={mockSetInput}
				handleKeyDown={mockHandleKeyDown}
				inputRef={ref}
			/>,
		);

		// Prompt metadata
		expect(screen.getByText('guest@portfolio:~$')).toBeInTheDocument();

		// Renders current value in styled span
		expect(screen.getByText('ls -la')).toBeInTheDocument();

		// Hidden input field value
		const inputEl = screen.getByRole('textbox') as HTMLInputElement;
		expect(inputEl).toBeInTheDocument();
		expect(inputEl.value).toBe('ls -la');

		// Typing should trigger setInput
		await user.type(inputEl, 'a');
		expect(mockSetInput).toHaveBeenCalled();

		// Keydown event trigger (like Enter)
		await user.keyboard('{Enter}');
		expect(mockHandleKeyDown).toHaveBeenCalled();
	});
});
