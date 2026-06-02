// Types
import { TerminalProps } from '../types';

export const TerminalHelpText = ({ helpText }: Pick<TerminalProps, 'helpText'>) => (
	<div className="whitespace-pre-wrap text-neutral-400">{helpText}</div>
);
