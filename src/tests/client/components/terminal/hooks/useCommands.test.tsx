import { renderHook } from '@testing-library/react';
import { useCommands } from '@/src/client/components/terminal/hooks/useCommands';
import { describe, expect, it } from 'vitest';
import type { Command } from '@/src/client/components/terminal/types';
import { render, screen } from '@testing-library/react';

const mockCommands: Command[] = [
	{
		id: 'whoami',
		label: 'whoami',
		helpText: 'Display current user info',
		renderOutput: () => 'guest',
	},
];

describe('useCommands', () => {
	it('returns help command along with initialCommands', () => {
		const { result } = renderHook(() => useCommands(mockCommands));

		// Expect help command to be added at the beginning
		expect(result.current.length).toBe(2);
		expect(result.current[0].id).toBe('help');
		expect(result.current[1].id).toBe('whoami');
	});

	it('renders help command details correctly', () => {
		const { result } = renderHook(() => useCommands(mockCommands));
		const helpCmd = result.current[0];

		// Render the output of the help command
		render(helpCmd.renderOutput({ command: helpCmd, rawInput: 'help' }) as React.ReactElement);

		// Check the help texts of both help and whoami commands are shown
		expect(screen.getByText('Lists all available shell commands')).toBeInTheDocument();
		expect(screen.getByText('Display current user info')).toBeInTheDocument();
	});
});
