import { getSystemPrompt } from '@/src/client/components/terminalChat/getSystemPrompt';
import { describe, expect, it } from 'vitest';
import type { User } from '@/src/shared/types';

const mockUser: User = {
	name: 'Anmol Kansal',
	gender: 'male',
	pronouns: ['he', 'him', 'his'],
	role: 'Senior Frontend Engineer',
	company: 'Google',
	shortIntro: 'Building the future of web.',
	bio: 'Passionate frontend engineer.',
	capabilities: [{ id: '1', label: 'Frontend', values: ['React', 'TypeScript'] }],
	experiences: [
		{
			id: 'exp1',
			role: 'Senior Developer',
			company: 'Tech Corp',
			time: '2023 - Present',
			location: 'SF',
			logo: '',
			responsibilities: ['Build cool UI'],
		},
	],
	projects: [
		{
			title: 'Cool App',
			description: 'Description of cool app',
			stack: ['React'],
			demoUrl: 'https://demo.com',
			sourceUrl: 'https://github.com',
		},
	],
	skillGroups: [{ category: 'Languages', skills: ['TS', 'JS'] }],
	socials: [{ name: 'GitHub', url: 'https://github.com', username: 'anmol' }],
	education: [{ id: '1', degree: 'BS', school: 'Uni', time: '2015-2019', score: '3.9' }],
	achievements: ['Won hackathon'],
	profilePicture: '',
};

describe('getSystemPrompt', () => {
	it('generates correct system prompt text using user profile properties', () => {
		const prompt = getSystemPrompt(mockUser);

		// Basic info
		expect(prompt).toContain('You are a personal assistant for Anmol Kansal.');
		expect(prompt).toContain('Current Role: Senior Frontend Engineer');
		expect(prompt).toContain('Current Company: Google');

		// Rules
		expect(prompt).toContain('Use the correct pronouns when referring to Anmol Kansal: "he" / "him" / "his".');

		// Capabilities & Skill groups
		expect(prompt).toContain('Frontend: React, TypeScript');
		expect(prompt).toContain('Languages: TS, JS');

		// Work Experience
		expect(prompt).toContain('Role: Senior Developer');
		expect(prompt).toContain('Company: Tech Corp');

		// Projects
		expect(prompt).toContain('Title: Cool App');
		expect(prompt).toContain('Demo: https://demo.com');

		// Education & achievements
		expect(prompt).toContain('Degree: BS');
		expect(prompt).toContain('Won hackathon');

		// Socials
		expect(prompt).toContain('Platform: GitHub | URL: https://github.com | Username: @anmol');
	});
});
