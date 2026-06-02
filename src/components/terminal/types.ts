import React from 'react';

export type CommandMap = Record<
  string, 
  (args: string[]) => React.ReactNode | Promise<React.ReactNode>
>;

export interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export interface TerminalProps {
  user: string;
  hostname: string;
  bootMessage: string;
  commands: CommandMap;
  prompt: string;
  className?: string;
}
