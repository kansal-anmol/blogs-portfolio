import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/src/client/components/ProjectCard';
import { describe, expect, it } from 'vitest';
import type { UserProject } from '@/src/shared/types';

const mockProject: UserProject = {
	title: 'Cool App',
	description: 'This app is really cool and builds stuff.',
	coverImage: 'https://example.com/project.png',
	stack: ['React', 'Next.js', 'Tailwind'],
	demoUrl: 'https://demo.example.com',
	sourceUrl: 'https://github.com/example/cool-app',
};

describe('ProjectCard', () => {
	it('renders project card details correctly with image and stack tags', () => {
		render(<ProjectCard project={mockProject} />);

		expect(screen.getByText('Cool App')).toBeInTheDocument();
		expect(screen.getByText('This app is really cool and builds stuff.')).toBeInTheDocument();
		expect(screen.getByText('React')).toBeInTheDocument();
		expect(screen.getByText('Next.js')).toBeInTheDocument();
		expect(screen.getByText('Tailwind')).toBeInTheDocument();

		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('src', 'https://example.com/project.png');
		expect(img).toHaveAttribute('alt', 'Cool App');

		const demoLink = screen.getByRole('link', { name: /Live Demo/i });
		expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');

		const sourceLink = screen.getByRole('link', { name: /Source Code/i });
		expect(sourceLink).toHaveAttribute('href', 'https://github.com/example/cool-app');
	});

	it('renders without cover image if not provided', () => {
		const projectWithoutImage = {
			...mockProject,
			coverImage: '',
		};
		render(<ProjectCard project={projectWithoutImage} />);

		expect(screen.queryByRole('img')).not.toBeInTheDocument();
	});
});
