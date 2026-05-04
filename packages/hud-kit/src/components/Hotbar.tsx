import type { HotbarProps, HotbarSlot } from '../types';

function renderIcon(slot: HotbarSlot) {
  if (typeof slot.icon === 'string') {
    return <img className="hk-hotbar__icon" src={slot.icon} alt={slot.label ?? slot.id} draggable={false} />;
  }

  return <span className="hk-hotbar__icon">{slot.icon}</span>;
}

export function Hotbar({
  slots,
  onSlotClick,
  orientation = 'horizontal',
  className,
}: HotbarProps) {
  return (
    <div
      className={['hk-root', 'hk-hotbar', orientation === 'vertical' && 'hk-hotbar--vertical', className]
        .filter(Boolean)
        .join(' ')}
      role="toolbar"
      aria-orientation={orientation}
    >
      {slots.map((slot, index) => {
        const cooldown = Math.min(1, Math.max(0, slot.cooldown ?? 0));
        const isCoolingDown = cooldown > 0;

        return (
          <button
            className={['hk-hotbar__slot', slot.disabled && 'hk-hotbar__slot--disabled'].filter(Boolean).join(' ')}
            type="button"
            key={slot.id}
            disabled={slot.disabled}
            onClick={() => onSlotClick?.(slot, index)}
            aria-label={slot.label ?? `Hotbar slot ${index + 1}`}
          >
            {slot.keybind && <span className="hk-hotbar__keybind">{slot.keybind}</span>}
            {renderIcon(slot)}
            {isCoolingDown && (
              <>
                <span className="hk-hotbar__cd-overlay" style={{ height: `${cooldown * 100}%` }} />
                <span className="hk-hotbar__cd-text">{Math.ceil(cooldown * 10) / 10}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
