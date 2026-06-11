import { render, screen } from '@testing-library/react';
import { TerminalOutput } from '@/src/client/components/terminal/components/TerminalOutput';
import { describe, expect, it } from 'vitest';
import type { CommandLog } from '@/src/client/components/terminal/types';

const mockLogs: CommandLog[] = [
	{ id: '1', command: 'whoami', output: 'Guest User' },
	{ id: '2', command: 'clear', output: null },
];

describe('TerminalOutput', () => {
	it('does not render logs if bootComplete is false', () => {
		const { container } = render(
			<TerminalOutput
				bootComplete={false}
				username="guest"
				hostname="portfolio"
				prompt="$"
				logs={mockLogs}
			/>,
		);
		expect(container.firstChild).toBeNull();
	});

	it('renders command execution history logs when bootComplete is true', () => {
		render(
			<TerminalOutput
				bootComplete={true}
				username="guest"
				hostname="portfolio"
				prompt="$"
				logs={mockLogs}
			/>,
		);

		// Render commands
		expect(screen.getByText('whoami')).toBeInTheDocument();
		expect(screen.getByText('Guest User')).toBeInTheDocument();

		// Renders prompt prefixes for commands
		const prefixes = screen.getAllByText('guest@portfolio:~$');
		expect(prefixes.length).toBe(2);
	});
});
