import type { Post } from '@/src/shared/types';
import type { Command } from '../../components/terminal/types';

export const OPEN_COMMAND: Command = {
	id: 'open',
	label: 'open <n>',
	helpText: 'Opens post of index <n> in a new browser tab (e.g. open 1)',
	renderOutput: ({ command, rawInput }) => {
		const trimmed = rawInput.trim();
		const parts = trimmed.split(/\s+/);
		const args = parts.slice(1);
		const idxStr = args[0];
		const posts = (command.meta?.posts || []) as Post[];

		if (!idxStr) {
			return (
				<span style={{ color: '#ef4444' }}>
					Error: Please specify the article index number (e.g. open 1)
				</span>
			);
		}

		const index = parseInt(idxStr, 10) - 1;
		if (isNaN(index) || index < 0 || index >= posts.length) {
			return (
				<span style={{ color: '#ef4444' }}>
					Error: Invalid index. Range is 1 to {posts.length}.
				</span>
			);
		}

		const post = posts[index];
		if (typeof window !== 'undefined') {
			window.open(`/blog/${post.slug}`, '_blank');
		}
		return (
			<span>
				Opening article: <strong style={{ color: '#b5f542' }}>{post.title}</strong> in a new tab...
			</span>
		);
	},
};
