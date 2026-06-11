import { render, screen } from '@testing-library/react';
import { TerminalHelpText } from '@/src/client/components/terminal/components/TerminalHelpText';
import { describe, expect, it } from 'vitest';

describe('TerminalHelpText', () => {
	it('renders helpText prop correctly', () => {
		render(<TerminalHelpText helpText="Welcome to the shell! Type 'help' to begin." />);
		expect(screen.getByText("Welcome to the shell! Type 'help' to begin.")).toBeInTheDocument();
	});
});
