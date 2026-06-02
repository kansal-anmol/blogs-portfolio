import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed: number = 10, onComplete?: () => void) {
  const [displayText, setDisplayText] = useState('');
  const onCompleteRef = useRef(onComplete);

  // Keep ref up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    if (!text) {
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
}
