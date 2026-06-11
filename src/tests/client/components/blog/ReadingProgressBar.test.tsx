import { render } from '@testing-library/react';
import { ReadingProgressBar } from '@/src/client/components/blog/ReadingProgressBar';
import { describe, expect, it } from 'vitest';

describe('ReadingProgressBar', () => {
	it('sets style width based on progress prop', () => {
		const { container, rerender } = render(<ReadingProgressBar progress={0.45} />);

		const progressDiv = container.firstChild as HTMLElement;
		expect(progressDiv).toHaveStyle('width: 45%');

		rerender(<ReadingProgressBar progress={0.8} />);
		expect(progressDiv).toHaveStyle('width: 80%');
	});
});
