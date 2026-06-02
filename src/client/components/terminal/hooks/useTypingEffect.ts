import { useEffect, useRef, useState } from 'react';

export function useTypingEffect({
	onComplete,
	speed,
	text,
}: {
	onComplete?: () => void;
	speed: number;
	text: string;
}) {
	const [displayText, setDisplayText] = useState('');
	const indexRef = useRef(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const onCompleteRef = useRef(onComplete);

	// Keep onComplete up‑to‑date
	useEffect(() => {
		onCompleteRef.current = onComplete;
	}, [onComplete]);

	useEffect(() => {
		// Reset state when text or speed changes
		setDisplayText('');
		indexRef.current = 0;
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		if (!text) {
			if (onCompleteRef.current) onCompleteRef.current();
			return;
		}

		intervalRef.current = setInterval(() => {
			setDisplayText((prev) => {
				const nextChar = text.charAt(indexRef.current);
				const next = prev + nextChar;
				indexRef.current += 1;
				if (indexRef.current >= text.length) {
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
					}
					if (onCompleteRef.current) onCompleteRef.current();
				}
				return next;
			});
		}, speed);

		// Cleanup on unmount or when dependencies change
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [text, speed]);

	return displayText;
}
