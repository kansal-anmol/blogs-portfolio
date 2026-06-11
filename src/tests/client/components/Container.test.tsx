import { render, screen } from '@testing-library/react';
import { Container } from '@/src/client/components/Container';
import { describe, expect, it } from 'vitest';

describe('Container', () => {
	it('renders children correctly', () => {
		render(<Container>Hello Container</Container>);
		expect(screen.getByText('Hello Container')).toBeInTheDocument();
	});

	it('appends custom className', () => {
		const { container } = render(<Container className="custom-class">Test</Container>);
		const div = container.firstChild as HTMLElement;
		expect(div).toHaveClass('container');
		expect(div).toHaveClass('mx-auto');
		expect(div).toHaveClass('custom-class');
	});
});
