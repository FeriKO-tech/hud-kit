import type { CSSProperties } from 'react';
import type { CrosshairProps } from '../types';

export function Crosshair({
  variant = 'classic',
  size = 42,
  gap = 8,
  thickness = 2,
  color = 'var(--hk-crosshair)',
  showCenterDot = variant !== 'dot',
  className,
}: CrosshairProps) {
  const style = {
    width: size,
    height: size,
    '--hk-crosshair-size': `${size}px`,
    '--hk-crosshair-gap': `${gap}px`,
    '--hk-crosshair-thickness': `${thickness}px`,
    '--hk-crosshair-color': color,
  } as CSSProperties;

  return (
    <div
      className={['hk-root', 'hk-crosshair', `hk-crosshair--${variant}`, className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
    >
      {variant !== 'dot' && (
        <>
          <span className="hk-crosshair__line hk-crosshair__line--top" />
          <span className="hk-crosshair__line hk-crosshair__line--right" />
          <span className="hk-crosshair__line hk-crosshair__line--bottom" />
          <span className="hk-crosshair__line hk-crosshair__line--left" />
        </>
      )}
      {(variant === 'circle' || variant === 'bracket') && <span className="hk-crosshair__ring" />}
      {(showCenterDot || variant === 'dot') && <span className="hk-crosshair__dot" />}
    </div>
  );
}
