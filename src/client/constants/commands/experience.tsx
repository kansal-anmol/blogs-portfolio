// Types
import { User } from '@/src/shared/types';
import type { Command } from '../../components/terminal/types';

export const EXPERIENCE_COMMAND: Command = {
	id: 'experience',
	label: 'experience',
	helpText: 'Renders detailed work history milestones',
	renderOutput: ({ command }) => {
		const user = command.meta?.user as User;
		if (!user) return null;

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
				{user.experiences.map((exp, index) => (
					<div key={exp.id}>
						<span style={{ color: '#b5f542', fontWeight: 'bold' }}>
							[{index + 1}] {exp.role} @ {exp.company}
						</span>{' '}
						({exp.time})
						<div style={{ color: '#a3a3a3', paddingLeft: '8px', fontSize: '13px' }}>
							{exp.responsibilities[0]}
						</div>
					</div>
				))}
			</div>
		);
	},
};
