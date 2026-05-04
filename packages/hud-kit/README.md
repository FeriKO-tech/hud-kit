# @feriko/hud-kit

Gaming HUD components for React.

## Install

```bash
pnpm add @feriko/hud-kit framer-motion
```

## Usage

```tsx
import { HealthBar, ManaBar } from '@feriko/hud-kit';
import '@feriko/hud-kit/styles.css';

export function PlayerHud() {
  return (
    <div>
      <HealthBar value={72} maxValue={100} segments={10} />
      <ManaBar value={38} maxValue={50} variant="segmented" segments={8} />
    </div>
  );
}
```

## Components

- `HealthBar`
- `ManaBar`
- `DamageNumber`
- `InventoryGrid`
- `DialogueBox`
- `Hotbar`
- `Minimap`
- `XPBar`
