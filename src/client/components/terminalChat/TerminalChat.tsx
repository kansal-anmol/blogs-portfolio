import type { MLCEngine } from '@mlc-ai/web-llm';
import React, { useEffect, useState } from 'react';

// Utils
import { getSystemPrompt } from './getSystemPrompt';

// Types
import type { User } from '@/src/shared/types';

// Global cache for WebLLM engine to avoid re-creation or re-downloading within the session
let cachedEngine: MLCEngine | null = null;
let isInitializing = false;

interface TerminalChatProps {
	user: User;
	query: string;
}

export const TerminalChat: React.FC<TerminalChatProps> = ({ user, query }) => {
	const [status, setStatus] = useState<'idle' | 'loading' | 'generating' | 'complete' | 'error'>(
		'idle',
	);
	const [progress, setProgress] = useState<string>('');
	const [answer, setAnswer] = useState<string>('');
	const [error, setError] = useState<string>('');

	useEffect(() => {
		if (!query.trim()) {
			setStatus('error');
			setError('Please provide a query. Usage: chat <your question>');
			return;
		}

		// WebGPU Support validation using safe navigator checks
		const gpuNavigator =
			typeof navigator !== 'undefined' ? (navigator as unknown as Record<string, unknown>) : null;

		if (!gpuNavigator || !gpuNavigator.gpu) {
			setStatus('error');
			setError(
				'WebGPU is not supported or enabled in your browser. WebLLM requires WebGPU to execute models locally. Please try Chrome, Edge, or another WebGPU-enabled browser.',
			);
			return;
		}

		async function runModel() {
			try {
				const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
				const modelId = 'Llama-3.2-3B-Instruct-q4f16_1-MLC';

				if (!cachedEngine) {
					setStatus('loading');
					if (isInitializing) {
						setTimeout(runModel, 1000);
						return;
					}
					isInitializing = true;

					cachedEngine = await CreateMLCEngine(modelId, {
						initProgressCallback: (report) => {
							setProgress(`${report.text} (${Math.round(report.progress * 100)}%)`);
						},
					});
					isInitializing = false;
				}

				setStatus('generating');

				const systemPrompt = getSystemPrompt(user);

				const messages = [
					{ role: 'system' as const, content: systemPrompt },
					{ role: 'user' as const, content: query },
				];

				const reply = await cachedEngine.chat.completions.create({
					messages,
					stream: true,
				});

				let fullText = '';
				for await (const chunk of reply) {
					const delta = chunk.choices[0]?.delta?.content || '';
					fullText += delta;
					setAnswer(fullText);
				}

				setStatus('complete');
			} catch (err: unknown) {
				isInitializing = false;
				console.error(err);
				setStatus('error');
				setError(err instanceof Error ? err.message : 'An error occurred during AI execution.');
			}
		}

		runModel();
	}, [query, user]);

	if (status === 'loading') {
		return (
			<div className="flex flex-col gap-1 font-mono text-gray-400">
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 animate-ping rounded-full bg-green-400" />
					<span>Loading local AI model... (WebGPU)</span>
				</div>
				{progress && <div className="text-2xs pl-4 text-gray-500">{progress}</div>}
			</div>
		);
	}

	if (status === 'generating') {
		return (
			<div className="font-mono whitespace-pre-wrap text-gray-100">
				{answer || 'Thinking...'}
				<span className="terminal-cursor bg-white-400 ml-1 inline-block h-[15px] w-2 align-middle" />
			</div>
		);
	}

	if (status === 'complete') {
		return <div className="font-mono whitespace-pre-wrap text-gray-100">{answer}</div>;
	}

	if (status === 'error') {
		return <div className="font-mono whitespace-pre-wrap text-red-400">Error: {error}</div>;
	}

	return null;
};
