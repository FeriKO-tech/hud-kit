import type { Meta, StoryObj } from '@storybook/react';
import {
  DamageNumber,
  DialogueBox,
  HealthBar,
  Hotbar,
  InventoryGrid,
  ManaBar,
  Minimap,
  XPBar,
  type HotbarSlot,
  type InventoryItem,
  type MinimapMarker,
} from '@feriko/hud-kit';

const items: (InventoryItem | null)[] = [
  { id: 'sword', name: 'Sunsteel Sword', icon: <span>⚔️</span>, rarity: 'rare' },
  { id: 'potion', name: 'Health Potion', icon: <span>🧪</span>, quantity: 5, rarity: 'uncommon' },
  { id: 'gem', name: 'Dragon Gem', icon: <span>💎</span>, rarity: 'legendary' },
  null,
  { id: 'scroll', name: 'Arcane Scroll', icon: <span>📜</span>, quantity: 2, rarity: 'epic' },
  null,
  null,
  null,
  null,
];

const hotbarSlots: HotbarSlot[] = [
  { id: 'attack', icon: <span>⚔️</span>, label: 'Attack', keybind: '1' },
  { id: 'dash', icon: <span>💨</span>, label: 'Dash', keybind: '2', cooldown: 0.35 },
  { id: 'shield', icon: <span>🛡️</span>, label: 'Shield', keybind: '3' },
  { id: 'meteor', icon: <span>☄️</span>, label: 'Meteor', keybind: '4', cooldown: 0.8 },
  { id: 'locked', icon: <span>🔒</span>, label: 'Locked', keybind: '5', disabled: true },
];

const markers: MinimapMarker[] = [
  { id: 'enemy-1', x: 44, y: 54, type: 'enemy' },
  { id: 'npc-1', x: 120, y: 92, type: 'npc', label: 'NPC' },
  { id: 'quest-1', x: 86, y: 32, type: 'quest' },
];

const meta = {
  title: 'HUD Kit/MVP Components',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Bars: Story = {
  render: () => (
    <div className="hk-story-panel" style={{ display: 'grid', gap: 18, width: 360 }}>
      <HealthBar value={68} maxValue={100} segments={10} size="lg" />
      <ManaBar value={42} maxValue={60} variant="linear" size="md" />
      <ManaBar value={7} maxValue={10} variant="segmented" segments={10} size="lg" />
      <XPBar currentXP={745} maxXP={1000} level={12} showLevelUp />
    </div>
  ),
};

export const CombatFeedback: Story = {
  render: () => (
    <div className="hk-story-panel" style={{ position: 'relative', width: 620, minHeight: 220 }}>
      <DamageNumber value={128} x={90} y={150} type="damage" />
      <DamageNumber value={284} x={230} y={146} type="crit" />
      <DamageNumber value={45} x={390} y={152} type="heal" />
      <DamageNumber value={0} x={520} y={156} type="miss" />
    </div>
  ),
};

export const InventoryAndHotbar: Story = {
  render: () => (
    <div className="hk-story-panel" style={{ display: 'grid', gap: 22, justifyItems: 'center', width: 420 }}>
      <InventoryGrid rows={3} cols={3} items={items} slotSize={56} />
      <Hotbar slots={hotbarSlots} />
    </div>
  ),
};

export const Dialogue: Story = {
  render: () => (
    <div className="hk-story-panel" style={{ width: 680 }}>
      <DialogueBox
        speaker="Aria"
        text="The gate is open. Choose your loadout before the next wave reaches the citadel."
        choices={[
          { id: 'charge', text: 'Charge into the breach' },
          { id: 'prepare', text: 'Prepare defensive wards' },
        ]}
        typeSpeed={18}
      />
    </div>
  ),
};

export const Map: Story = {
  render: () => (
    <div className="hk-story-panel" style={{ display: 'grid', placeItems: 'center', width: 360 }}>
      <Minimap markers={markers} playerPosition={{ x: 80, y: 82, rotation: 0.8 }} zoom={1.05} />
    </div>
  ),
};
