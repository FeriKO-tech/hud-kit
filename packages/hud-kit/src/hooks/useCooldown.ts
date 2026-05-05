import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Cooldown hook - counts down from a duration to 0.
 * @param duration - total cooldown in seconds
 * @returns { remaining, progress (0-1), isReady, start, reset }
 */
export function useCooldown(duration: number) {
  const [remaining, setRemaining] = useState(0);
  const [isReady, setIsReady] = useState(true);
  const frameRef = useRef<number>();
  const startTimeRef = useRef(0);

  const tick = useCallback(() => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const left = Math.max(0, duration - elapsed);
    setRemaining(left);
    if (left <= 0) {
      setIsReady(true);
    } else {
      frameRef.current = requestAnimationFrame(tick);
    }
  }, [duration]);

  const start = useCallback(() => {
    setIsReady(false);
    startTimeRef.current = Date.now();
    setRemaining(duration);
    frameRef.current = requestAnimationFrame(tick);
  }, [duration, tick]);

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setRemaining(0);
    setIsReady(true);
  }, []);

  useEffect(() => {
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, []);

  const progress = duration > 0 ? remaining / duration : 0;

  return { remaining, progress, isReady, start, reset };
}
