import { Post } from '@/src/shared/types';
import type { Command } from '../../components/terminal/types';

export const BLOGS_COMMAND: Command = {
	id: 'blogs',
	label: 'blogs',
	helpText: "Lists recent blogs. Use 'blogs --tag <tag>' to filter",
	renderOutput: ({ command, rawInput }) => {
		const trimmed = rawInput.trim();
		const parts = trimmed.split(/\s+/);
		const args = parts.slice(1);
		let posts = (command.meta?.posts || []) as Post[];

		if (args.includes('--tag')) {
			const tagIdx = args.indexOf('--tag');
			const tagValue = args[tagIdx + 1]?.toLowerCase();

			if (!tagValue) {
				return (
					<span style={{ color: '#ef4444' }}>
						Error: Please provide a tag. Usage: blogs --tag &lt;tag-name&gt;
					</span>
				);
			}

			posts = posts.filter((post) => post.tags?.some((t) => t.name.toLowerCase() === tagValue));
		}

		if (posts.length === 0) {
			return <span>No matching articles found.</span>;
		}

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
				{posts.map((post, index) => (
					<div key={post.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
						<span style={{ color: '#b5f542', fontWeight: 'bold' }}>[{index + 1}]</span>
						<span style={{ color: '#a3a3a3', whiteSpace: 'nowrap' }}>
							{new Date(post.publishedAt).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric',
							})}
						</span>
						<span>{post.title}</span>
					</div>
				))}
				<div style={{ color: '#a3a3a3', fontSize: '12px', marginTop: '6px' }}>
					Type 'open &lt;index&gt;' (e.g., 'open 1') to open the corresponding article.
				</div>
			</div>
		);
	},
};
