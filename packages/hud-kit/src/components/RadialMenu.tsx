import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { RadialMenuItem, RadialMenuProps } from '../types';

function renderIcon(item: RadialMenuItem) {
  if (!item.icon) return <span className="hk-radial__label">{item.label}</span>;
  if (typeof item.icon === 'string') {
    return <img className="hk-radial__icon" src={item.icon} alt="" draggable={false} />;
  }
  return <span className="hk-radial__icon">{item.icon}</span>;
}

export function RadialMenu({
  items,
  radius = 86,
  size = 220,
  activeIndex = 0,
  onSelect,
  className,
}: RadialMenuProps) {
  const firstEnabled = useMemo(() => items.findIndex((item) => !item.disabled), [items]);
  const [focusedIndex, setFocusedIndex] = useState(() => (firstEnabled >= 0 ? firstEnabled : 0));
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (firstEnabled >= 0 && items[focusedIndex]?.disabled) setFocusedIndex(firstEnabled);
  }, [firstEnabled, focusedIndex, items]);

  function moveFocus(direction: 1 | -1) {
    if (items.length === 0) return;
    for (let step = 1; step <= items.length; step++) {
      const next = (focusedIndex + step * direction + items.length) % items.length;
      if (!items[next]?.disabled) {
        setFocusedIndex(next);
        buttonRefs.current[next]?.focus();
        return;
      }
    }
  }

  function selectItem(item: RadialMenuItem, index: number) {
    if (item.disabled) return;
    setFocusedIndex(index);
    onSelect?.(item, index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      moveFocus(1);
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(-1);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      if (firstEnabled >= 0) {
        setFocusedIndex(firstEnabled);
        buttonRefs.current[firstEnabled]?.focus();
      }
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      const lastEnabled = [...items].reverse().findIndex((item) => !item.disabled);
      if (lastEnabled >= 0) {
        const index = items.length - 1 - lastEnabled;
        setFocusedIndex(index);
        buttonRefs.current[index]?.focus();
      }
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const item = items[focusedIndex];
      if (item) selectItem(item, focusedIndex);
    }
  }

  const segmentStep = items.length > 0 ? 360 / items.length : 360;
  const background =
    items.length > 0
      ? `conic-gradient(from -90deg, ${items
          .map((_, index) => {
            const start = index * segmentStep;
            const end = start + segmentStep;
            const color = index === activeIndex ? 'var(--hk-radial-active)' : 'var(--hk-radial-slice)';
            return `${color} ${start}deg ${end}deg`;
          })
          .join(', ')})`
      : 'var(--hk-radial-slice)';

  return (
    <div
      className={['hk-root', 'hk-radial', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, background }}
      role="menu"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Radial menu"
    >
      <div className="hk-radial__center" />
      {items.map((item, index) => {
        const angle = -90 + segmentStep * index + segmentStep / 2;
        const style = {
          '--hk-radial-angle': `${angle}deg`,
          '--hk-radial-radius': `${radius}px`,
        } as CSSProperties;
        const isActive = index === activeIndex;
        const isFocused = index === focusedIndex;

        return (
          <button
            className={[
              'hk-radial__item',
              isActive && 'hk-radial__item--active',
              isFocused && 'hk-radial__item--focused',
            ]
              .filter(Boolean)
              .join(' ')}
            type="button"
            key={item.id}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            role="menuitem"
            disabled={item.disabled}
            aria-label={item.label}
            style={style}
            onClick={() => selectItem(item, index)}
            onFocus={() => setFocusedIndex(index)}
          >
            {renderIcon(item)}
            {item.icon && <span className="hk-radial__tooltip">{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
