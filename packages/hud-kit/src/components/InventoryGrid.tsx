import { useState, type DragEvent } from 'react';
import type { InventoryGridProps, InventoryItem } from '../types';

function renderIcon(item: InventoryItem) {
  if (typeof item.icon === 'string') {
    return <img className="hk-inv__icon" src={item.icon} alt={item.name} draggable={false} />;
  }

  return <span className="hk-inv__icon">{item.icon}</span>;
}

export function InventoryGrid({
  rows,
  cols,
  items,
  onItemMove,
  onItemClick,
  slotSize = 48,
  className,
}: InventoryGridProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const slotCount = Math.max(0, rows * cols);
  const slots = Array.from({ length: slotCount }, (_, index) => items[index] ?? null);

  function handleDragStart(event: DragEvent<HTMLButtonElement>, index: number) {
    if (!slots[index]) {
      event.preventDefault();
      return;
    }

    setDragIndex(index);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(index));
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>, index: number) {
    event.preventDefault();
    const from = dragIndex ?? Number(event.dataTransfer.getData('text/plain'));

    setDragIndex(null);
    setOverIndex(null);

    if (!Number.isInteger(from) || from === index || from < 0 || from >= slotCount) return;
    onItemMove?.(from, index);
  }

  return (
    <div
      className={['hk-root', 'hk-inv', className].filter(Boolean).join(' ')}
      style={{ gridTemplateColumns: `repeat(${cols}, ${slotSize}px)` }}
      role="grid"
      aria-rowcount={rows}
      aria-colcount={cols}
    >
      {slots.map((item, index) => (
        <button
          className={[
            'hk-inv__slot',
            item?.rarity && `hk-inv__slot--${item.rarity}`,
            dragIndex === index && 'hk-inv__slot--dragging',
            overIndex === index && dragIndex !== null && dragIndex !== index && 'hk-inv__slot--over',
          ]
            .filter(Boolean)
            .join(' ')}
          type="button"
          key={item?.id ?? `empty-${index}`}
          draggable={Boolean(item)}
          onClick={() => item && onItemClick?.(item, index)}
          onDragStart={(event) => handleDragStart(event, index)}
          onDragEnd={() => {
            setDragIndex(null);
            setOverIndex(null);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
            setOverIndex(index);
          }}
          onDragLeave={() => setOverIndex((current) => (current === index ? null : current))}
          onDrop={(event) => handleDrop(event, index)}
          style={{ width: slotSize, height: slotSize }}
          role="gridcell"
          aria-label={item ? item.name : `Empty slot ${index + 1}`}
        >
          {item && renderIcon(item)}
          {item?.quantity && item.quantity > 1 && <span className="hk-inv__qty">{item.quantity}</span>}
        </button>
      ))}
    </div>
  );
}
