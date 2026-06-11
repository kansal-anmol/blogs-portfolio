import { AuthorCard } from '@/src/client/components/blog/AuthorCard';
import type { User, UserSocial } from '@/src/shared/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const mockUser = {
	name: 'Anmol Kansal',
	role: 'Senior Frontend Engineer',
	bio: 'Passionate about web applications and architecture.',
} as User;

const mockSocials: UserSocial[] = [
	{ username: '1', name: 'GitHub', url: 'https://github.com/test' },
	{ username: '2', name: 'LinkedIn', url: 'https://linkedin.com/test' },
];

describe('AuthorCard', () => {
	it('renders author profile details and social links correctly', () => {
		render(<AuthorCard user={mockUser} socials={mockSocials} />);

		expect(screen.getByText('Anmol Kansal')).toBeInTheDocument();
		expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
		expect(
			screen.getByText('Passionate about web applications and architecture.'),
		).toBeInTheDocument();

		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('alt', 'Anmol Kansal');

		const githubLink = screen.getByRole('link', { name: /Visit my GitHub/i });
		expect(githubLink).toHaveAttribute('href', 'https://github.com/test');

		const linkedinLink = screen.getByRole('link', { name: /Visit my LinkedIn/i });
		expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/test');
	});
});
