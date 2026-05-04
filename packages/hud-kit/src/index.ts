/* HUD Kit — Gaming HUD components for React */
import './styles/components.css';

export type {
  HealthBarProps,
  ManaBarProps,
  XPBarProps,
  DamageNumberProps,
  InventoryItem,
  InventoryGridProps,
  HotbarSlot,
  HotbarProps,
  DialogueChoice,
  DialogueBoxProps,
  MinimapMarker,
  MinimapProps,
  Size,
  Rarity,
  DamageType,
} from './types';

export { HealthBar } from './components/HealthBar';
export { ManaBar } from './components/ManaBar';
export { DamageNumber } from './components/DamageNumber';
export { InventoryGrid } from './components/InventoryGrid';
export { Hotbar } from './components/Hotbar';
export { DialogueBox } from './components/DialogueBox';
export { Minimap } from './components/Minimap';
export { XPBar } from './components/XPBar';
export { useTypewriter } from './hooks/useTypewriter';
export { useCooldown } from './hooks/useCooldown';
