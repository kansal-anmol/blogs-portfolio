import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableOfContents } from '@/src/client/components/blog/TableOfContents';
import { describe, expect, it } from 'vitest';

const mockItems = [
	{ slug: 'introduction', title: 'Introduction' },
	{ slug: 'getting-started', title: 'Getting Started' },
	{ slug: 'conclusion', title: 'Conclusion' },
];

describe('TableOfContents', () => {
	it('returns null when empty items array is provided', () => {
		const { container } = render(<TableOfContents items={[]} activeHeadingId="" />);
		expect(container.firstChild).toBeNull();
	});

	it('renders table of contents sidebar with links and applies active styles', () => {
		render(<TableOfContents items={mockItems} activeHeadingId="getting-started" />);

		// Check title rendered in desktop
		const headings = screen.getAllByRole('heading', { name: /Table of Contents/i });
		expect(headings.length).toBeGreaterThan(0);

		const introLink = screen.getAllByRole('link', { name: 'Introduction' })[0];
		const startLink = screen.getAllByRole('link', { name: 'Getting Started' })[0];

		expect(introLink).toHaveAttribute('href', '#introduction');
		expect(introLink).toHaveClass('text-neutral-400');

		expect(startLink).toHaveAttribute('href', '#getting-started');
		expect(startLink).toHaveClass('text-[#b5f542]');
	});

	it('toggles mobile drawer on click of floating action button', async () => {
		const user = userEvent.setup();
		const { container } = render(
			<TableOfContents items={mockItems} activeHeadingId="introduction" />,
		);

		// The floating button should be in the document
		const openBtn = screen.getByRole('button', { name: /Open Table of Contents/i });
		expect(openBtn).toBeInTheDocument();

		// Initially, drawer container should have translate-y-full class (not visible)
		// Wait, the panel div has className ending with either translate-y-0 or translate-y-full.
		// Let's find the panel. It is the div with the pull bar.
		const panels = container.querySelectorAll('.translate-y-full');
		expect(panels.length).toBe(1);

		// Click to open drawer
		await user.click(openBtn);

		// Now translate-y-0 should be present and translate-y-full should not be
		const openedPanels = container.querySelectorAll('.translate-y-0');
		expect(openedPanels.length).toBe(1);

		// Close button inside the drawer
		const closeBtn = screen.getByRole('button', { name: '' }); // the drawer close button has no aria-label, wait: it renders IoCloseOutline
		// We can get it by querying for close button or checking elements.
		// Let's see: the close button has className "h-8 w-8 ..." and contains IoCloseOutline.
		// We can click it to close:
		await user.click(closeBtn);

		const closedPanels = container.querySelectorAll('.translate-y-full');
		expect(closedPanels.length).toBe(1);
	});
});
