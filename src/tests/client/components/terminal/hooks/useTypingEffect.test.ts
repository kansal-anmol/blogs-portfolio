import { renderHook, act } from '@testing-library/react';
import { useTypingEffect } from '@/src/client/components/terminal/hooks/useTypingEffect';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

describe('useTypingEffect', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('returns typed text character by character based on speed', () => {
		const onComplete = vi.fn();
		const { result } = renderHook(() =>
			useTypingEffect({
				text: 'Hello',
				speed: 100,
				onComplete,
			}),
		);

		// Initially, should be empty
		expect(result.current).toBe('');

		// Advance 100ms
		act(() => {
			vi.advanceTimersByTime(100);
		});
		expect(result.current).toBe('H');

		// Advance 200ms
		act(() => {
			vi.advanceTimersByTime(200);
		});
		expect(result.current).toBe('Hel');

		// Advance remaining time
		act(() => {
			vi.advanceTimersByTime(200);
		});
		expect(result.current).toBe('Hello');
		expect(onComplete).toHaveBeenCalled();
	});

	it('calls onComplete immediately if text is empty', () => {
		const onComplete = vi.fn();
		const { result } = renderHook(() =>
			useTypingEffect({
				text: '',
				speed: 100,
				onComplete,
			}),
		);

		expect(result.current).toBe('');
		expect(onComplete).toHaveBeenCalled();
	});
});
