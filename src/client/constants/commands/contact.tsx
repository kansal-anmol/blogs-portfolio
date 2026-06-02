import React from 'react';

// Types
import type { User } from '@/src/shared/types';
import type { Command } from '../../components/terminal/types';

export const CONTACT_COMMAND: Command = {
	id: 'contact',
	label: 'contact',
	helpText: 'Renders active social networking profile links',
	renderOutput: ({ command }) => {
		const user = command.meta?.user as User;
		if (!user) return null;

		const socials = user.socials.map((social) => ({
			...social,
			displayUrl: social.url.replace(/^https?:\/\/(www\.)?/, ''),
		}));

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
				<div>Reach out via any of the social channels below:</div>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '120px 1fr',
						gap: '6px',
						marginTop: '4px',
						paddingLeft: '8px',
					}}
				>
					{socials.map((social) => (
						<React.Fragment key={social.name}>
							<span style={{ color: '#a3a3a3' }}>{social.name}:</span>
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: '#4ade80', textDecoration: 'underline' }}
							>
								{social.displayUrl}
							</a>
						</React.Fragment>
					))}
				</div>
			</div>
		);
	},
};
