import { PageFooter } from '@/src/client/components/PageFooter';
import type { UserSocial } from '@/src/shared/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const mockSocials: UserSocial[] = [
	{ username: '1', name: 'GitHub', url: 'https://github.com/test' },
	{ username: '2', name: 'LinkedIn', url: 'https://linkedin.com/test' },
	{ username: '3', name: 'UnknownSocial', url: 'https://unknown.com' }, // Should be filtered out because there is no icon for it
];

describe('PageFooter', () => {
	it('renders author name, current year, and active socials', () => {
		render(<PageFooter authorName="Anmol Kansal" socials={mockSocials} />);

		const currentYear = new Date().getFullYear().toString();
		expect(screen.getByText(new RegExp(`© ${currentYear} Anmol Kansal`))).toBeInTheDocument();

		// Check GitHub link
		const githubLink = screen.getByRole('link', { name: /Visit my GitHub/i });
		expect(githubLink).toBeInTheDocument();
		expect(githubLink).toHaveAttribute('href', 'https://github.com/test');

		// Check LinkedIn link
		const linkedinLink = screen.getByRole('link', { name: /Visit my LinkedIn/i });
		expect(linkedinLink).toBeInTheDocument();
		expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/test');

		// Unknown social should not be rendered
		const unknownLink = screen.queryByRole('link', { name: /Visit my UnknownSocial/i });
		expect(unknownLink).not.toBeInTheDocument();
	});
});
