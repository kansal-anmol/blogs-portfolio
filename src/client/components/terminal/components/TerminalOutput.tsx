// Components
import { FreezeChildren } from './FreezeChildren';

// Types
import type { CommandLog, TerminalProps } from '../types';

type TerminalOutputProps = Pick<TerminalProps, 'username' | 'hostname' | 'prompt'> & {
	bootComplete: boolean;
	logs: CommandLog[];
};

export const TerminalOutput = ({
	bootComplete,
	hostname,
	logs,
	prompt,
	username,
}: TerminalOutputProps) => {
	return (
		bootComplete &&
		logs.map((log) => (
			<div key={log.id} className="flex flex-col gap-2">
				{/* Previous Command Line */}
				<div className="flex items-center gap-2 font-semibold whitespace-nowrap text-green-400">
					<span>
						{username}@{hostname}:~{prompt}
					</span>{' '}
					<span className="flex flex-grow items-center break-all whitespace-pre-wrap text-white">
						{log.command}
					</span>
				</div>

				{/* Output Content */}
				{log.output && (
					<FreezeChildren>
						<div className="break-words whitespace-pre-wrap text-gray-100">{log.output}</div>
					</FreezeChildren>
				)}
			</div>
		))
	);
};
