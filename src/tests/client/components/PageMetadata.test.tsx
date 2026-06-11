import { render } from '@testing-library/react';
import { PageMetadata } from '@/src/client/components/PageMetadata';
import { describe, expect, it, vi } from 'vitest';
import type { User } from '@/src/shared/types';

// Mock next/head so that we can verify tags in DOM
vi.mock('next/head', () => {
	return {
		default: ({ children }: { children: React.ReactNode }) => {
			return <div data-testid="head">{children}</div>;
		},
	};
});

const mockUser = {
	name: 'Anmol Kansal',
	role: 'Senior Frontend Engineer',
	shortIntro: 'Building the future of web.',
} as User;

describe('PageMetadata', () => {
	it('renders fallback and default metadata correctly', () => {
		render(<PageMetadata user={mockUser} />);

		// Document Title
		expect(document.title).toBe('Anmol Kansal | Senior Frontend Engineer');

		// Description
		const metaDesc = document.head.querySelector('meta[name="description"]');
		expect(metaDesc).toHaveAttribute('content', 'Senior Frontend Engineer. Building the future of web.');

		// Canonical
		const linkCanonical = document.head.querySelector('link[rel="canonical"]');
		expect(linkCanonical).toBeInTheDocument();

		// Robots
		const metaRobots = document.head.querySelector('meta[name="robots"]');
		expect(metaRobots).toHaveAttribute('content', 'index, follow');

		// Open Graph Type
		const ogType = document.head.querySelector('meta[property="og:type"]');
		expect(ogType).toHaveAttribute('content', 'website');
	});

	it('renders custom metadata correctly when provided', () => {
		render(
			<PageMetadata
				user={mockUser}
				title="My Custom Title"
				description="My Custom Description"
				urlPath="custom-path"
				ogType="article"
				ogImage="https://example.com/custom-og.png"
				noIndex={true}
			/>,
		);

		// Document Title
		expect(document.title).toBe('My Custom Title — Anmol Kansal');

		// Description
		const metaDesc = document.head.querySelector('meta[name="description"]');
		expect(metaDesc).toHaveAttribute('content', 'My Custom Description');

		// Robots
		const metaRobots = document.head.querySelector('meta[name="robots"]');
		expect(metaRobots).toHaveAttribute('content', 'noindex, nofollow');

		// OG Meta
		expect(document.head.querySelector('meta[property="og:type"]')).toHaveAttribute(
			'content',
			'article',
		);
		expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute(
			'content',
			'https://example.com/custom-og.png',
		);
	});
});
