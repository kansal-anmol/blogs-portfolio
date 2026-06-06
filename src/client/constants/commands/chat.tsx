// Components
import { TerminalChat } from '../../components/terminalChat';

// Types
import type { User } from '@/src/shared/types';
import type { Command } from '../../components/terminal/types';

export const CHAT_COMMAND: Command = {
	id: 'chat',
	label: 'chat',
	helpText: (
		<span style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
			Ask any questions about Anmol.
			<br />
			<span style={{ color: '#6b7280' }}>
				Example usage: chat what is total experience of anmol
			</span>
		</span>
	),
	renderOutput: ({ command, rawInput }) => {
		const user = command.meta?.user as User;
		const query = rawInput.split(' ').slice(1).join(' ');

		if (!user) return <div className="text-red-400">Error: User context not available.</div>;

		return <TerminalChat user={user} query={query} />;
	},
};
