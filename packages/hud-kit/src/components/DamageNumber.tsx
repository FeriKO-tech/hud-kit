import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { DamageNumberProps } from '../types';

function getLabel(value: number, type: NonNullable<DamageNumberProps['type']>) {
  if (type === 'miss') return 'MISS';
  if (type === 'heal') return `+${Math.abs(value)}`;
  return `-${Math.abs(value)}`;
}

export function DamageNumber({
  value,
  x,
  y,
  type = 'damage',
  onComplete,
  className,
}: DamageNumberProps) {
  const motionPath = useMemo(() => {
    const direction = type === 'crit' ? 1 : -1;
    const drift = direction * (18 + Math.abs(value % 17));
    const peak = type === 'crit' ? -108 : type === 'heal' ? -76 : -88;
    const scale = type === 'crit' ? [0.45, 1.45, 1, 0.72] : [0.6, 1.12, 1, 0.82];

    return { drift, peak, scale };
  }, [type, value]);

  return (
    <div className="hk-dmg-container" style={{ left: x, top: y }} aria-hidden="true">
      <motion.span
        className={['hk-root', 'hk-dmg', `hk-dmg--${type}`, className].filter(Boolean).join(' ')}
        initial={{ opacity: 0, x: 0, y: 0, scale: motionPath.scale[0] }}
        animate={{
          opacity: [0, 1, 1, 0],
          x: [0, motionPath.drift * 0.35, motionPath.drift],
          y: [0, motionPath.peak * 0.42, motionPath.peak],
          scale: motionPath.scale,
        }}
        transition={{ duration: type === 'crit' ? 1.35 : 1.15, ease: 'easeOut', times: [0, 0.14, 0.68, 1] }}
        onAnimationComplete={onComplete}
      >
        {getLabel(value, type)}
      </motion.span>
    </div>
  );
}
