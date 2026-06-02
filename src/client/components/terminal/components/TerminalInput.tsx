// Libs
import { RefObject } from 'react';

// Types
import type { TerminalProps } from '../types';

type TerminalInputProps = Pick<TerminalProps, 'username' | 'hostname' | 'prompt'> & {
	handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	input: string;
	inputRef: RefObject<HTMLInputElement | null>;
	setInput: (input: string) => void;
};

export const TerminalInput = ({
	username,
	hostname,
	prompt,
	inputRef,
	input,
	setInput,
	handleKeyDown,
}: TerminalInputProps) => (
	<div className="relative flex w-full cursor-text items-center gap-2">
		<div className="flex items-center gap-2 font-semibold whitespace-nowrap text-green-400">
			<span>
				{username}@{hostname}:~{prompt}
			</span>
		</div>

		<div className="flex flex-grow items-center break-all whitespace-pre-wrap text-white">
			<span>{input}</span>
			<span className="terminal-cursor ml-0.5 inline-block h-[15px] w-2 bg-[#4ade80] align-middle"></span>
		</div>

		<input
			autoCapitalize="none"
			autoComplete="off"
			className="font-inherit absolute top-0 left-0 h-full w-full cursor-text border-none bg-transparent text-inherit text-transparent opacity-0 outline-none"
			onChange={(e) => setInput(e.target.value)}
			onKeyDown={handleKeyDown}
			ref={inputRef}
			spellCheck={false}
			type="text"
			value={input}
		/>
	</div>
);
