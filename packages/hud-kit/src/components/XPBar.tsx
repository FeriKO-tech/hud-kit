import { useEffect, useRef } from 'react';
import type { XPBarProps } from '../types';

function clampPercent(value: number, maxValue: number) {
  if (maxValue <= 0) return 0;
  return Math.min(100, Math.max(0, (value / maxValue) * 100));
}

function formatValue(value: number) {
  return Number.isInteger(value) ? value : Number(value.toFixed(1));
}

export function XPBar({
  currentXP,
  maxXP,
  level,
  showLevelUp = false,
  onLevelUpComplete,
  size = 'md',
  className,
}: XPBarProps) {
  const percent = clampPercent(currentXP, maxXP);
  const completionRef = useRef(onLevelUpComplete);

  useEffect(() => {
    completionRef.current = onLevelUpComplete;
  }, [onLevelUpComplete]);

  useEffect(() => {
    if (!showLevelUp) return;
    const timeout = window.setTimeout(() => completionRef.current?.(), 800);
    return () => window.clearTimeout(timeout);
  }, [showLevelUp]);

  return (
    <div className={['hk-root', 'hk-xp__wrapper', className].filter(Boolean).join(' ')}>
      <span className={['hk-xp__level', showLevelUp && 'hk-xp__level--up'].filter(Boolean).join(' ')}>
        {level}
      </span>
      <div
        className={['hk-xp', `hk-xp--${size}`].join(' ')}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={maxXP}
        aria-valuenow={Math.min(Math.max(currentXP, 0), maxXP)}
      >
        <div className="hk-xp__fill" style={{ width: `${percent}%` }}>
          <div className="hk-xp__shine" />
        </div>
        <span className="hk-xp__label">
          {formatValue(Math.min(Math.max(currentXP, 0), maxXP))} / {formatValue(maxXP)} XP
        </span>
      </div>
    </div>
  );
}
