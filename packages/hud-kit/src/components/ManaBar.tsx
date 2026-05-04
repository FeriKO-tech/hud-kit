import type { ManaBarProps } from '../types';

const radialSize = {
  sm: 56,
  md: 72,
  lg: 96,
};

const strokeWidth = {
  sm: 6,
  md: 8,
  lg: 10,
};

function clampPercent(value: number, maxValue: number) {
  if (maxValue <= 0) return 0;
  return Math.min(100, Math.max(0, (value / maxValue) * 100));
}

function formatValue(value: number) {
  return Number.isInteger(value) ? value : Number(value.toFixed(1));
}

export function ManaBar({
  value,
  maxValue,
  variant = 'linear',
  size = 'md',
  showValue = true,
  className,
}: ManaBarProps) {
  const percent = clampPercent(value, maxValue);
  const safeValue = Math.min(Math.max(value, 0), maxValue);

  if (variant === 'radial') {
    const boxSize = radialSize[size];
    const stroke = strokeWidth[size];
    const radius = (boxSize - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div
        className={['hk-root', 'hk-mana-radial', className].filter(Boolean).join(' ')}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-valuenow={safeValue}
      >
        <svg className="hk-mana-radial__svg" width={boxSize} height={boxSize} viewBox={`0 0 ${boxSize} ${boxSize}`}>
          <circle className="hk-mana-radial__bg" cx={boxSize / 2} cy={boxSize / 2} r={radius} strokeWidth={stroke} />
          <circle
            className="hk-mana-radial__fill"
            cx={boxSize / 2}
            cy={boxSize / 2}
            r={radius}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        {showValue && <span className="hk-mana-radial__label">{Math.round(percent)}%</span>}
      </div>
    );
  }

  return (
    <div
      className={['hk-root', 'hk-mana', `hk-mana--${size}`, className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuenow={safeValue}
    >
      <div className="hk-mana__fill" style={{ width: `${percent}%` }}>
        <div className="hk-mana__shine" />
      </div>
      {showValue && (
        <span className="hk-mana__label">
          {formatValue(safeValue)} / {formatValue(maxValue)}
        </span>
      )}
    </div>
  );
}
