import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  BuffsBar,
  Crosshair,
  DamageNumber,
  DialogueBox,
  HealthBar,
  Hotbar,
  InventoryGrid,
  ManaBar,
  Minimap,
  QuestTracker,
  RadialMenu,
  XPBar,
  useSound,
  type BuffItem,
  type HotbarSlot,
  type InventoryItem,
  type MinimapMarker,
  type Quest,
  type RadialMenuItem,
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

const radialItems: RadialMenuItem[] = [
  { id: 'attack', label: 'Attack', icon: <span>⚔️</span> },
  { id: 'spell', label: 'Spell', icon: <span>✨</span> },
  { id: 'guard', label: 'Guard', icon: <span>🛡️</span> },
  { id: 'item', label: 'Item', icon: <span>🧪</span> },
  { id: 'map', label: 'Map', icon: <span>🗺️</span> },
  { id: 'wait', label: 'Wait', icon: <span>⏳</span> },
];

const quests: Quest[] = [
  {
    id: 'citadel',
    title: 'Hold the Citadel',
    description: 'Keep the gate alive until reinforcements arrive.',
    active: true,
    objectives: [
      { id: 'waves', text: 'Survive enemy waves', current: 3, max: 5 },
      { id: 'captain', text: 'Defeat the raid captain', completed: false },
    ],
  },
  {
    id: 'relics',
    title: 'Recover Lost Relics',
    progress: 0.66,
    objectives: [{ id: 'relics', text: 'Relics recovered', current: 2, max: 3 }],
  },
];

const buffs: BuffItem[] = [
  { id: 'haste', label: 'Haste', icon: <span>💨</span>, duration: 30, remaining: 18, stacks: 2 },
  { id: 'shield', label: 'Shield', icon: <span>🛡️</span>, duration: 45, remaining: 40 },
  { id: 'burn', label: 'Burning', icon: <span>🔥</span>, duration: 12, remaining: 5, type: 'debuff' },
  { id: 'food', label: 'Well fed', icon: <span>🍖</span>, type: 'neutral' },
];

function RadialMenuDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  return <RadialMenu items={radialItems} activeIndex={activeIndex} onSelect={(_, index) => setActiveIndex(index)} />;
}

function SoundDemo() {
  const { play, stop } = useSound('/ui-click.mp3', { volume: 0.35 });
  return (
    <div className="hk-story-panel" style={{ display: 'flex', gap: 12, width: 320 }}>
      <button type="button" className="hk-dlg__choice" onClick={() => void play()}>
        Play UI sound
      </button>
      <button type="button" className="hk-dlg__choice" onClick={stop}>
        Stop
      </button>
    </div>
  );
}

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

export const StretchComponents: Story = {
  render: () => (
    <div className="hk-story-panel" style={{ display: 'grid', gap: 22, justifyItems: 'center', width: 760 }}>
      <RadialMenuDemo />
      <QuestTracker quests={quests} />
      <BuffsBar buffs={buffs} />
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Crosshair variant="classic" />
        <Crosshair variant="dot" />
        <Crosshair variant="circle" />
        <Crosshair variant="bracket" />
      </div>
    </div>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(260px, 1fr))', gap: 16 }}>
      {['cyberpunk', 'dark-fantasy', 'sao-style', 'minimal'].map((theme) => (
        <div className="hk-story-panel" data-hk-theme={theme} key={theme} style={{ display: 'grid', gap: 14 }}>
          <strong>{theme}</strong>
          <HealthBar value={72} maxValue={100} segments={8} />
          <ManaBar value={38} maxValue={60} />
          <BuffsBar buffs={buffs.slice(0, 3)} size={36} />
        </div>
      ))}
    </div>
  ),
};

export const SoundHook: Story = {
  render: () => <SoundDemo />,
};
