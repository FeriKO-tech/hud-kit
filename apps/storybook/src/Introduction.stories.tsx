import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'HUD Kit/Introduction',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <article className="hk-story-panel" style={{ maxWidth: 760 }}>
      <h1 style={{ marginTop: 0 }}>HUD Kit</h1>
      <p>
        React components for web-game interfaces: bars, combat feedback, inventory, dialogue,
        hotbars, and minimaps.
      </p>
      <h2>Goals</h2>
      <ul>
        <li>Ship typed React components for game HUDs.</li>
        <li>Keep styling themeable with CSS variables.</li>
        <li>Document every component with interactive Storybook stories.</li>
      </ul>
    </article>
  ),
};
