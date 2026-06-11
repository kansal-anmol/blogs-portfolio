import { render, screen } from '@testing-library/react';
import { ExperienceCard } from '@/src/client/components/ExperienceCard';
import { describe, expect, it } from 'vitest';
import type { UserExperience } from '@/src/shared/types';

const mockExperience: UserExperience = {
	id: 'exp1',
	company: 'Tech Corp',
	role: 'Senior Developer',
	logo: 'https://example.com/logo.png',
	time: '2023 - Present',
	location: 'San Francisco, CA',
	responsibilities: ['Built cool things', 'Led a team of awesome people'],
};

describe('ExperienceCard', () => {
	it('renders experience details correctly with logo', () => {
		render(<ExperienceCard experience={mockExperience} />);

		expect(screen.getByText('Tech Corp')).toBeInTheDocument();
		expect(screen.getByText('Senior Developer')).toBeInTheDocument();
		expect(screen.getByText('2023 - Present')).toBeInTheDocument();
		expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
		expect(screen.getByText('Built cool things')).toBeInTheDocument();
		expect(screen.getByText('Led a team of awesome people')).toBeInTheDocument();

		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('src', 'https://example.com/logo.png');
		expect(img).toHaveAttribute('alt', 'Tech Corp');
	});

	it('renders fallback icon when logo is missing', () => {
		const experienceWithoutLogo = {
			...mockExperience,
			logo: '',
		};
		const { container } = render(<ExperienceCard experience={experienceWithoutLogo} />);

		expect(screen.queryByRole('img')).not.toBeInTheDocument();
		// The FaCode SVG should be rendered
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});
});
