import type { ReactNode } from 'react';

/* ── Shared Types ── */
export type Size = 'sm' | 'md' | 'lg';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type DamageType = 'damage' | 'heal' | 'crit' | 'miss';

/* ── HealthBar ── */
export interface HealthBarProps {
  value: number;
  maxValue: number;
  showDamage?: boolean;
  segments?: number;
  size?: Size;
  showValue?: boolean;
  className?: string;
}

/* ── ManaBar ── */
export interface ManaBarProps {
  value: number;
  maxValue: number;
  variant?: 'linear' | 'radial' | 'segmented';
  segments?: number;
  size?: Size;
  showValue?: boolean;
  className?: string;
}

/* ── XPBar ── */
export interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  showLevelUp?: boolean;
  onLevelUpComplete?: () => void;
  size?: Size;
  className?: string;
}

/* ── DamageNumber ── */
export interface DamageNumberProps {
  value: number;
  x: number;
  y: number;
  type?: DamageType;
  onComplete?: () => void;
  className?: string;
}

/* ── Inventory ── */
export interface InventoryItem {
  id: string;
  name: string;
  icon: string | ReactNode;
  quantity?: number;
  rarity?: Rarity;
}

export interface InventoryGridProps {
  rows: number;
  cols: number;
  items: (InventoryItem | null)[];
  onItemMove?: (from: number, to: number) => void;
  onItemClick?: (item: InventoryItem, index: number) => void;
  slotSize?: number;
  className?: string;
}

/* ── Hotbar ── */
export interface HotbarSlot {
  id: string;
  icon: string | ReactNode;
  label?: string;
  keybind?: string;
  cooldown?: number;
  disabled?: boolean;
}

export interface HotbarProps {
  slots: HotbarSlot[];
  onSlotClick?: (slot: HotbarSlot, index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/* ── DialogueBox ── */
export interface DialogueChoice {
  id: string;
  text: string;
}

export interface DialogueBoxProps {
  speaker?: string;
  text: string;
  choices?: DialogueChoice[];
  onChoice?: (choice: DialogueChoice) => void;
  onComplete?: () => void;
  typeSpeed?: number;
  avatar?: string;
  className?: string;
}

/* ── Minimap ── */
export interface MinimapMarker {
  id: string;
  x: number;
  y: number;
  type?: 'player' | 'enemy' | 'npc' | 'quest' | 'custom';
  color?: string;
  label?: string;
}

export interface MinimapProps {
  width?: number;
  height?: number;
  mapSrc?: string;
  markers?: MinimapMarker[];
  playerPosition?: { x: number; y: number; rotation?: number };
  zoom?: number;
  shape?: 'square' | 'circle';
  className?: string;
}

export interface RadialMenuItem {
  id: string;
  label: string;
  icon?: string | ReactNode;
  disabled?: boolean;
}

export interface RadialMenuProps {
  items: RadialMenuItem[];
  radius?: number;
  size?: number;
  activeIndex?: number;
  onSelect?: (item: RadialMenuItem, index: number) => void;
  className?: string;
}

export interface QuestObjective {
  id: string;
  text: string;
  current?: number;
  max?: number;
  completed?: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description?: string;
  objectives?: QuestObjective[];
  progress?: number;
  active?: boolean;
}

export interface QuestTrackerProps {
  quests: Quest[];
  title?: string;
  onQuestClick?: (quest: Quest) => void;
  className?: string;
}

export interface BuffItem {
  id: string;
  label: string;
  icon: string | ReactNode;
  duration?: number;
  remaining?: number;
  stacks?: number;
  type?: 'buff' | 'debuff' | 'neutral';
}

export interface BuffsBarProps {
  buffs: BuffItem[];
  size?: number;
  onBuffClick?: (buff: BuffItem, index: number) => void;
  className?: string;
}

export interface CrosshairProps {
  variant?: 'classic' | 'dot' | 'circle' | 'bracket';
  size?: number;
  gap?: number;
  thickness?: number;
  color?: string;
  showCenterDot?: boolean;
  className?: string;
}
