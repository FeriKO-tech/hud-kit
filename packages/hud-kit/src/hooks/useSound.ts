import { useCallback, useEffect, useRef } from 'react';

export interface UseSoundOptions {
  volume?: number;
  playbackRate?: number;
  interrupt?: boolean;
  disabled?: boolean;
}

export function useSound(source?: string, options: UseSoundOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!source || typeof Audio === 'undefined') {
      audioRef.current = null;
      return;
    }
    audioRef.current = new Audio(source);
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [source]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    const currentOptions = optionsRef.current;
    if (!audio || currentOptions.disabled) return false;
    audio.volume = Math.min(1, Math.max(0, currentOptions.volume ?? 1));
    audio.playbackRate = currentOptions.playbackRate ?? 1;
    if (currentOptions.interrupt ?? true) audio.currentTime = 0;
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  return { play, stop, sound: audioRef };
}
