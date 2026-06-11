import { render, screen } from '@testing-library/react';
import { FreezeChildren } from '@/src/client/components/terminal/components/FreezeChildren';
import { describe, expect, it } from 'vitest';

describe('FreezeChildren', () => {
	it('prevents re-rendering of children on updates', () => {
		const { rerender } = render(
			<FreezeChildren>
				<span>Initial Text</span>
			</FreezeChildren>,
		);

		expect(screen.getByText('Initial Text')).toBeInTheDocument();

		rerender(
			<FreezeChildren>
				<span>Updated Text</span>
			</FreezeChildren>,
		);

		// It should still render 'Initial Text' and NOT 'Updated Text'
		expect(screen.getByText('Initial Text')).toBeInTheDocument();
		expect(screen.queryByText('Updated Text')).not.toBeInTheDocument();
	});
});
