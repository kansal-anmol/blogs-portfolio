import { USER } from '../../../shared/constants/user';

// Types
import type { Command } from '../../components/terminal/types';

export const WHOAMI_COMMAND: Command = {
	id: 'whoami',
	label: 'whoami',
	helpText: 'Short personal introduction paragraph',
	renderOutput: () => <div style={{ color: '#f3f4f6', lineHeight: '1.6' }}>{USER.shortIntro}</div>,
};
