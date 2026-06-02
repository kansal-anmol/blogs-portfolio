import React, { KeyboardEvent, useRef, useState } from 'react';

// Hooks
import { useCommands } from './useCommands';

// Types
import { Command, CommandLog } from '../types';

export function useTerminal(initialCommands: Command[]) {
	const commands = useCommands(initialCommands);

	const [input, setInput] = useState('');
	const [logs, setLogs] = useState<CommandLog[]>([]);
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);

	const tempInput = useRef('');

	const executeCommand = async (rawInput: string) => {
		const trimmed = rawInput.trim();
		if (!trimmed) {
			setLogs((prev) => [
				...prev,
				{
					id: Math.random().toString(),
					command: '',
					output: null,
				},
			]);
			return;
		}

		const newHistory = [...history, rawInput];
		setHistory(newHistory);
		setHistoryIndex(newHistory.length);

		const parts = trimmed.split(/\s+/);
		const commandId = parts[0].toLowerCase();

		if (commandId === 'clear') {
			setLogs([]);
			setInput('');
			return;
		}

		let output: React.ReactNode = '';

		const foundCommand = commands.find((cmd) => cmd.id.toLowerCase() === commandId);
		if (foundCommand) {
			try {
				const result = foundCommand.renderOutput({ command: foundCommand, rawInput });
				if (result instanceof Promise) {
					output = await result;
				} else {
					output = result;
				}
			} catch (err: any) {
				output = `Error executing command: ${err?.message || err}`;
			}
		} else {
			output = `Command not found: ${commandId}. Type "help" for a list of available commands.`;
		}

		setLogs((prev) => [
			...prev,
			{
				id: Math.random().toString(),
				command: rawInput,
				output,
			},
		]);
		setInput('');
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			executeCommand(input);
		} else if (e.key === 'Tab') {
			e.preventDefault();
			const trimmed = input.trim().toLowerCase();
			if (!trimmed) return;
			const availableCommandIds = ['clear', ...commands.map((c) => c.id.toLowerCase())];
			const matches = availableCommandIds.filter((cmd) => cmd.startsWith(trimmed));
			if (matches.length === 1) {
				setInput(matches[0]);
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (history.length === 0) return;

			let newIndex = historyIndex;
			if (historyIndex === -1 || historyIndex === history.length) {
				tempInput.current = input;
				newIndex = history.length - 1;
			} else if (historyIndex > 0) {
				newIndex = historyIndex - 1;
			}

			setHistoryIndex(newIndex);
			setInput(history[newIndex]);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (history.length === 0 || historyIndex === -1) return;

			let newIndex = historyIndex + 1;
			if (newIndex >= history.length) {
				setHistoryIndex(history.length);
				setInput(tempInput.current);
			} else {
				setHistoryIndex(newIndex);
				setInput(history[newIndex]);
			}
		}
	};

	return {
		input,
		setInput,
		logs,
		setLogs,
		handleKeyDown,
		executeCommand,
	};
}
