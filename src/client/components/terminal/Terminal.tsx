import React, { useEffect, useRef, useState } from 'react';

// Hooks
import { useTerminal } from './hooks/useTerminal';
import { useTypingEffect } from './hooks/useTypingEffect';

// Components
import { TerminalHelpText } from './components/TerminalHelpText';
import { TerminalInput } from './components/TerminalInput';
import { TerminalOutput } from './components/TerminalOutput';

// Types
import { TerminalProps } from './types';

export const Terminal: React.FC<TerminalProps> = ({
	className = '',
	commands,
	helpText: _helpText,
	hostname,
	prompt,
	username,
}) => {
	const [bootComplete, setBootComplete] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const helpText =
		_helpText ?? `Booting ${hostname}... done.\nType 'help' to view the list of commands.`;

	const displayHelpText = useTypingEffect({
		text: helpText,
		speed: 8,
		onComplete: () => setBootComplete(true),
	});

	const { input, setInput, logs, handleKeyDown, executeCommand } = useTerminal(commands);

	// Auto-run "help" command when typewriter boot sequence finishes
	useEffect(() => {
		if (bootComplete) {
			executeCommand('help');
		}
	}, [bootComplete]);

	// Keep terminal scrolled to the absolute bottom on logs or typing updates
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [logs, displayHelpText, input]);

	// Handle focusing the hidden input on click of the terminal body
	const handleTerminalClick = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	// Automatically focus on mount (if boot complete)
	useEffect(() => {
		if (bootComplete && inputRef.current) {
			inputRef.current.focus();
		}
	}, [bootComplete]);

	return (
		<div
			ref={containerRef}
			onClick={handleTerminalClick}
			className={`box-border flex h-full flex-col overflow-y-auto rounded-xl border border-[#222222] bg-black p-6 font-mono text-[14px] leading-relaxed text-gray-300 ${className}`}
		>
			<style>{`
				@keyframes terminal-blink {
					50% { opacity: 0; }
				}
				.terminal-cursor {
					animation: terminal-blink 1s step-start infinite;
				}
			`}</style>

			<div className="mb-2 flex flex-col gap-4">
				<TerminalHelpText helpText={displayHelpText} />

				<TerminalOutput
					username={username}
					hostname={hostname}
					prompt={prompt}
					bootComplete={bootComplete}
					logs={logs}
				/>
			</div>

			{bootComplete && (
				<TerminalInput
					handleKeyDown={handleKeyDown}
					hostname={hostname}
					input={input}
					inputRef={inputRef}
					prompt={prompt}
					setInput={setInput}
					username={username}
				/>
			)}
		</div>
	);
};
