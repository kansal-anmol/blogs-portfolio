import React from 'react';

// Types
import type { Command } from '../../components/terminal/types';

// Constants
import { USER } from '../../../shared/constants/user';

export const ABOUT_COMMAND: Command = {
	id: 'about',
	label: 'about',
	helpText: 'Renders complete bio summary and tech capabilities',
	renderOutput: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<div>
				<span style={{ color: '#b5f542', fontWeight: 'bold' }}>BIO: </span>
				{USER.bio}
			</div>
			<div>
				<span style={{ color: '#b5f542', fontWeight: 'bold' }}>CAPABILITIES:</span>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '120px 1fr',
						gap: '6px',
						marginTop: '4px',
						paddingLeft: '8px',
					}}
				>
					{USER.capabilities.map((cap) => (
						<React.Fragment key={cap.id}>
							<span style={{ color: '#a3a3a3' }}>{cap.label}:</span>
							<span>{cap.values.join(', ')}</span>
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	),
};

