import React from 'react';

export interface Command {
	id: string;
	label: string;
	helpText: React.ReactNode;
	renderOutput: (props: {
		command: Command;
		rawInput: string;
	}) => React.ReactNode | Promise<React.ReactNode>;
	meta?: Record<string, any>;
}

// History - Internal
export interface CommandLog {
	id: string;
	command: string;
	output: React.ReactNode;
}

export interface TerminalProps {
	className?: string;
	commands: Command[];
	helpText?: string;
	hostname: string;
	prompt: string;
	username: string;
}
