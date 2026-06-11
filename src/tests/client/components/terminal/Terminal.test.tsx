import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Terminal } from '@/src/client/components/terminal/Terminal';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import type { Command } from '@/src/client/components/terminal/types';

const mockCommands: Command[] = [
	{
		id: 'whoami',
		label: 'whoami',
		helpText: 'Display current user info',
		renderOutput: () => 'guest',
	},
];

describe('Terminal', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('shows boot typing effect, then completes boot and executes help', async () => {
		render(
			<Terminal
				hostname="portfolio"
				username="guest"
				prompt="$"
				commands={mockCommands}
			/>,
		);

		// Initially bootComplete should be false, input should not be rendered
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

		// Fast forward boot typing effect (length of helpText is small, speed is 8ms per char)
		await act(async () => {
			await vi.advanceTimersByTimeAsync(1000);
		});

		// Now boot should be complete and input should render
		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();

		// It should auto run 'help' command and render the output
		expect(screen.getByText(/shell, version 1\.0\.0-release/)).toBeInTheDocument();
		expect(screen.getByText('Lists all available shell commands')).toBeInTheDocument();
		expect(screen.getByText('Display current user info')).toBeInTheDocument();
	});

	it('allows typing and executing commands', async () => {
		// We use real timers for userEvent typing or wait, userEvent works better with real timers
		// so let's run this test with real timers.
		vi.useRealTimers();
		const user = userEvent.setup();

		render(
			<Terminal
				hostname="portfolio"
				username="guest"
				prompt="$"
				commands={mockCommands}
				helpText="Instant Boot" // Use very short helpText so it boots immediately in real time
			/>,
		);

		// Wait for boot sequence to finish
		const input = await screen.findByRole('textbox');
		expect(input).toBeInTheDocument();

		// Type whoami
		await user.type(input, 'whoami{Enter}');

		// The output of whoami should render
		await waitFor(() => {
			expect(screen.getByText('guest')).toBeInTheDocument();
		});
	});
});
