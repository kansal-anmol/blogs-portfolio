import React, { useMemo } from 'react';

// Types
import type { Command } from '../types';

export const useCommands = (initialCommands: Command[]): Command[] =>
	useMemo(() => {
		const helpCommand: Command = {
			id: 'help',
			label: 'help',
			helpText: 'Lists all available shell commands',
			renderOutput: () => (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					<div>anmolkansal.in shell, version 1.0.0-release</div>
					<div>These shell commands are defined internally. Type 'help' to see this list.</div>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '150px 1fr',
							gap: '8px',
							marginTop: '8px',
						}}
					>
						<span style={{ color: '#b5f542', fontWeight: 'bold' }}>help</span>
						<span style={{ color: '#a3a3a3' }}>Lists all available shell commands</span>

						<span style={{ color: '#b5f542', fontWeight: 'bold' }}>clear</span>
						<span style={{ color: '#a3a3a3' }}>Clears the active logs history</span>

						{initialCommands.map((cmd) => (
							<React.Fragment key={cmd.id}>
								<span style={{ color: '#b5f542', fontWeight: 'bold' }}>{cmd.label}</span>
								<span style={{ color: '#a3a3a3' }}>{cmd.helpText}</span>
							</React.Fragment>
						))}
					</div>
				</div>
			),
		};

		return [helpCommand, ...initialCommands];
	}, [initialCommands]);
