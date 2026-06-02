// Types
import type { User } from '@/src/shared/types';
import type { Command } from '../../components/terminal/types';

export const WHOAMI_COMMAND: Command = {
	id: 'whoami',
	label: 'whoami',
	helpText: 'Short personal introduction paragraph',
	renderOutput: ({ command }) => {
		const user = command.meta?.user as User;

		if (!user) return null;

		return <div style={{ color: '#f3f4f6', lineHeight: '1.6' }}>{user.shortIntro}</div>;
	},
};
