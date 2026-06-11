import { renderHook, act } from '@testing-library/react';
import { useTerminal } from '@/src/client/components/terminal/hooks/useTerminal';
import { describe, expect, it, vi } from 'vitest';
import type { Command } from '@/src/client/components/terminal/types';

const mockCommands: Command[] = [
	{
		id: 'whoami',
		label: 'whoami',
		helpText: 'Display user info',
		renderOutput: vi.fn().mockReturnValue('guest'),
	},
	{
		id: 'async-cmd',
		label: 'async-cmd',
		helpText: 'Async command',
		renderOutput: vi.fn().mockResolvedValue('async resolved output'),
	},
];

describe('useTerminal', () => {
	it('executes sync and async commands and handles unknown commands', async () => {
		const { result } = renderHook(() => useTerminal(mockCommands));

		expect(result.current.input).toBe('');
		expect(result.current.logs).toEqual([]);

		// Set input
		act(() => {
			result.current.setInput('whoami');
		});
		expect(result.current.input).toBe('whoami');

		// Execute command whoami
		await act(async () => {
			await result.current.executeCommand('whoami');
		});

		expect(result.current.input).toBe('');
		expect(result.current.logs).toHaveLength(1);
		expect(result.current.logs[0].command).toBe('whoami');
		expect(result.current.logs[0].output).toBe('guest');

		// Execute async command
		await act(async () => {
			await result.current.executeCommand('async-cmd');
		});
		expect(result.current.logs).toHaveLength(2);
		expect(result.current.logs[1].command).toBe('async-cmd');
		expect(result.current.logs[1].output).toBe('async resolved output');

		// Execute unknown command
		await act(async () => {
			await result.current.executeCommand('unknown');
		});
		expect(result.current.logs).toHaveLength(3);
		expect(result.current.logs[2].output).toContain('Command not found: unknown');
	});

	it('clears logs when executing clear command', async () => {
		const { result } = renderHook(() => useTerminal(mockCommands));

		await act(async () => {
			await result.current.executeCommand('whoami');
		});
		expect(result.current.logs).toHaveLength(1);

		await act(async () => {
			await result.current.executeCommand('clear');
		});
		expect(result.current.logs).toHaveLength(0);
	});

	it('autocompletes commands on Tab key down', () => {
		const { result } = renderHook(() => useTerminal(mockCommands));

		// Set partial input
		act(() => {
			result.current.setInput('wh');
		});

		// Simulate Tab key down
		const preventDefault = vi.fn();
		act(() => {
			result.current.handleKeyDown({
				key: 'Tab',
				preventDefault,
			} as any);
		});

		expect(preventDefault).toHaveBeenCalled();
		expect(result.current.input).toBe('whoami');
	});

	it('navigates command history with ArrowUp and ArrowDown', async () => {
		const { result } = renderHook(() => useTerminal(mockCommands));

		// Execute 2 commands to fill history
		await act(async () => {
			await result.current.executeCommand('first');
		});
		await act(async () => {
			await result.current.executeCommand('second');
		});

		// Type a temporary unsaved input
		act(() => {
			result.current.setInput('unsaved');
		});

		const preventDefault = vi.fn();

		// ArrowUp should load 'second'
		act(() => {
			result.current.handleKeyDown({ key: 'ArrowUp', preventDefault } as any);
		});
		expect(result.current.input).toBe('second');

		// ArrowUp should load 'first'
		act(() => {
			result.current.handleKeyDown({ key: 'ArrowUp', preventDefault } as any);
		});
		expect(result.current.input).toBe('first');

		// ArrowDown should load 'second' again
		act(() => {
			result.current.handleKeyDown({ key: 'ArrowDown', preventDefault } as any);
		});
		expect(result.current.input).toBe('second');

		// ArrowDown beyond history should restore 'unsaved'
		act(() => {
			result.current.handleKeyDown({ key: 'ArrowDown', preventDefault } as any);
		});
		expect(result.current.input).toBe('unsaved');
	});
});
