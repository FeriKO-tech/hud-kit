import type { CSSProperties } from 'react';
import type { BuffItem, BuffsBarProps } from '../types';

function renderIcon(buff: BuffItem) {
  if (typeof buff.icon === 'string') {
    return <img className="hk-buffs__icon" src={buff.icon} alt="" draggable={false} />;
  }
  return <span className="hk-buffs__icon">{buff.icon}</span>;
}

function remainingRatio(buff: BuffItem) {
  if (typeof buff.remaining !== 'number' || typeof buff.duration !== 'number' || buff.duration <= 0) return 1;
  return Math.min(1, Math.max(0, buff.remaining / buff.duration));
}

export function BuffsBar({
  buffs,
  size = 42,
  onBuffClick,
  className,
}: BuffsBarProps) {
  return (
    <div className={['hk-root', 'hk-buffs', className].filter(Boolean).join(' ')} role="list">
      {buffs.map((buff, index) => {
        const ratio = remainingRatio(buff);
        const style = {
          width: size,
          height: size,
          '--hk-buff-progress': `${ratio * 360}deg`,
        } as CSSProperties;
        const isInteractive = Boolean(onBuffClick);

        return (
          <button
            className={['hk-buffs__item', `hk-buffs__item--${buff.type ?? 'buff'}`].join(' ')}
            type="button"
            key={buff.id}
            disabled={!isInteractive}
            onClick={() => onBuffClick?.(buff, index)}
            style={style}
            title={buff.label}
            role="listitem"
          >
            <span className="hk-buffs__ring" />
            {renderIcon(buff)}
            {buff.stacks && buff.stacks > 1 && <span className="hk-buffs__stacks">{buff.stacks}</span>}
            {typeof buff.remaining === 'number' && <span className="hk-buffs__timer">{Math.ceil(buff.remaining)}</span>}
          </button>
        );
      })}
    </div>
  );
}
