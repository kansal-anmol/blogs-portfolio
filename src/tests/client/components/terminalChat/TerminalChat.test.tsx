import { render, screen, waitFor } from '@testing-library/react';
import { TerminalChat } from '@/src/client/components/terminalChat/TerminalChat';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
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

// Mock the web-llm engine dynamic import
const mockCompletionsCreate = vi.fn();
const mockCreateMLCEngine = vi.fn();

vi.mock('@mlc-ai/web-llm', () => {
	return {
		CreateMLCEngine: mockCreateMLCEngine,
	};
});

describe('TerminalChat', () => {
	const originalNavigator = global.navigator;

	beforeEach(() => {
		vi.resetAllMocks();

		// Default: mock WebGPU support
		Object.defineProperty(global, 'navigator', {
			value: {
				gpu: {},
			},
			configurable: true,
			writable: true,
		});
	});

	afterEach(() => {
		Object.defineProperty(global, 'navigator', {
			value: originalNavigator,
			configurable: true,
			writable: true,
		});
	});

	it('renders error immediately if query is empty', () => {
		render(<TerminalChat user={mockUser} query="" />);
		expect(screen.getByText(/Please provide a query/i)).toBeInTheDocument();
	});

	it('renders error if WebGPU is not supported', () => {
		// Set navigator.gpu to undefined
		Object.defineProperty(global, 'navigator', {
			value: {
				gpu: undefined,
			},
			configurable: true,
			writable: true,
		});

		render(<TerminalChat user={mockUser} query="who are you?" />);
		expect(screen.getByText(/WebGPU is not supported or enabled/i)).toBeInTheDocument();
	});

	it('streams AI completions successfully when WebGPU is supported', async () => {
		// Mock completions stream generator
		mockCompletionsCreate.mockImplementation(async function* () {
			yield { choices: [{ delta: { content: 'Hello ' } }] };
			yield { choices: [{ delta: { content: 'there!' } }] };
		});

		const mockEngine = {
			chat: {
				completions: {
					create: mockCompletionsCreate,
				},
			},
		};

		// Mock engine creation
		mockCreateMLCEngine.mockImplementation(async (modelId: string, config: any) => {
			// Trigger the progress callback to test progress updates
			if (config?.initProgressCallback) {
				config.initProgressCallback({ text: 'Downloading model', progress: 0.5 });
			}
			return mockEngine;
		});

		render(<TerminalChat user={mockUser} query="tell me about yourself" />);

		// Wait for completion (handles dynamic import and completions generation)
		await waitFor(() => {
			expect(screen.getByText('Hello there!')).toBeInTheDocument();
		});

		// Verify completions API details
		expect(mockCreateMLCEngine).toHaveBeenCalled();
		expect(mockCompletionsCreate).toHaveBeenCalledWith(
			expect.objectContaining({
				messages: expect.arrayContaining([
					expect.objectContaining({ role: 'user', content: 'tell me about yourself' }),
				]),
				stream: true,
			}),
		);
	});
});
