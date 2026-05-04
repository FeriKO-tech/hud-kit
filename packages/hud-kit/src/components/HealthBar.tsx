import { useEffect, useMemo, useRef, useState } from 'react';
import type { HealthBarProps } from '../types';

function clampPercent(value: number, maxValue: number) {
  if (maxValue <= 0) return 0;
  return Math.min(100, Math.max(0, (value / maxValue) * 100));
}

function formatValue(value: number) {
  return Number.isInteger(value) ? value : Number(value.toFixed(1));
}

export function HealthBar({
  value,
  maxValue,
  showDamage = true,
  segments = 0,
  size = 'md',
  showValue = true,
  className,
}: HealthBarProps) {
  const percent = clampPercent(value, maxValue);
  const previousPercent = useRef(percent);
  const [damagePercent, setDamagePercent] = useState(percent);
  const segmentLines = useMemo(() => Math.max(0, Math.floor(segments)), [segments]);
  const fillTone = percent <= 25 ? 'low' : percent <= 50 ? 'mid' : 'high';

  useEffect(() => {
    const previous = previousPercent.current;
    previousPercent.current = percent;

    if (!showDamage || percent >= previous) {
      setDamagePercent(percent);
      return;
    }

    setDamagePercent(previous);
    const timeout = window.setTimeout(() => setDamagePercent(percent), 80);
    return () => window.clearTimeout(timeout);
  }, [percent, showDamage]);

  return (
    <div
      className={['hk-root', 'hk-health', `hk-health--${size}`, className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuenow={Math.min(Math.max(value, 0), maxValue)}
    >
      <div className="hk-health__track">
        {showDamage && <div className="hk-health__damage" style={{ width: `${damagePercent}%` }} />}
        <div
          className={[
            'hk-health__fill',
            fillTone === 'low' && 'hk-health__fill--low',
            fillTone === 'mid' && 'hk-health__fill--mid',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ width: `${percent}%` }}
        />
        <div className="hk-health__shine" />
        {segmentLines > 1 && (
          <div className="hk-health__segments">
            {Array.from({ length: segmentLines }).map((_, index) => (
              <span className="hk-health__seg-line" key={index} />
            ))}
          </div>
        )}
        {showValue && (
          <span className={['hk-health__label', size === 'lg' && 'hk-health__label--lg'].filter(Boolean).join(' ')}>
            {formatValue(Math.min(Math.max(value, 0), maxValue))} / {formatValue(maxValue)}
          </span>
        )}
      </div>
    </div>
  );
}
