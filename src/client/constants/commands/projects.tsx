// Types
import type { User } from '@/src/shared/types';
import type { Command } from '../../components/terminal/types';

export const PROJECTS_COMMAND: Command = {
	id: 'projects',
	label: 'projects',
	helpText: 'Renders featured engineering projects with Source + Demo links',
	renderOutput: ({ command }) => {
		const user = command.meta?.user as User;
		if (!user) return null;

		const githubLink = user.socials.find((s) => s.name.toLowerCase() === 'github')?.url;

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
				{user.projects.map((proj) => (
					<div key={proj.title}>
						<span style={{ color: '#b5f542', fontWeight: 'bold' }}>{proj.title}</span>
						<div style={{ color: '#a3a3a3', fontSize: '13px' }}>{proj.description}</div>
						<div style={{ display: 'flex', gap: '12px', fontSize: '12px', marginTop: '2px' }}>
							<a
								href={proj.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: '#4ade80', textDecoration: 'underline' }}
							>
								Demo
							</a>
							<a
								href={proj.sourceUrl}
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: '#4ade80', textDecoration: 'underline' }}
							>
								Source
							</a>
						</div>
					</div>
				))}
				<div style={{ marginTop: '4px' }}>
					<a
						href={githubLink}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: '#b5f542', textDecoration: 'underline', fontWeight: 'bold' }}
					>
						More on GitHub →
					</a>
				</div>
			</div>
		);
	},
};
