import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Typewriter hook - reveals text character by character.
 * @param text - full text to reveal
 * @param speed - ms per character (default: 40)
 * @returns { displayedText, isComplete, reset }
 */
export function useTypewriter(text: string, speed = 40) {
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      timerRef.current = setTimeout(() => {
        setIndex((i) => i + 1);
      }, speed);
    } else if (text.length > 0) {
      setIsComplete(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [index, text, speed]);

  const reset = useCallback(() => {
    setIndex(0);
    setIsComplete(false);
  }, []);

  return { displayedText: text.slice(0, index), isComplete, reset };
}
