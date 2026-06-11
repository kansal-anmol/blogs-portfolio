import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageNavbar } from '@/src/client/components/PageNavbar';
import { describe, expect, it, vi } from 'vitest';

const mockRouter = {
	pathname: '/',
};

vi.mock('next/router', () => ({
	useRouter: () => mockRouter,
}));

describe('PageNavbar', () => {
	it('renders navbar links with correct active state styling', () => {
		mockRouter.pathname = '/';
		const { rerender } = render(<PageNavbar />);

		// Home link should be active
		const homeLink = screen.getByRole('link', { name: 'Home' });
		expect(homeLink).toHaveClass('text-[#b5f542]');

		// About link should not be active
		const aboutLink = screen.getByRole('link', { name: 'About' });
		expect(aboutLink).toHaveClass('text-neutral-400');

		// Change path to /about
		mockRouter.pathname = '/about';
		rerender(<PageNavbar />);

		// Home link should be inactive, About should be active
		expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('text-neutral-400');
		expect(screen.getByRole('link', { name: 'About' })).toHaveClass('text-[#b5f542]');
	});

	it('toggles mobile menu drawer on hamburger click', async () => {
		const user = userEvent.setup();
		render(<PageNavbar />);

		// Mobile menu links should not be visible initially
		// (Actually they are rendered conditionally if isMobileMenuOpen is true,
		// and the query for mobile links will fail or return desktop links.
		// Let's check: the desktop links are always visible.
		// The mobile links only exist when isMobileMenuOpen is true.
		// We can test by finding the Toggle Menu button)
		const toggleBtn = screen.getByRole('button', { name: /Toggle Menu/i });
		expect(toggleBtn).toBeInTheDocument();

		// Initially, only 1 link named 'Home' (desktop menu) should be present
		expect(screen.getAllByRole('link', { name: 'Home' }).length).toBe(1);

		await user.click(toggleBtn);

		// Now we should have 2 Home links (desktop and mobile)
		expect(screen.getAllByRole('link', { name: 'Home' }).length).toBe(2);

		// Click again to close
		await user.click(toggleBtn);
		expect(screen.getAllByRole('link', { name: 'Home' }).length).toBe(1);
	});
});
