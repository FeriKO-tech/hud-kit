import type { Preview } from '@storybook/react';
import '@feriko/hud-kit/styles.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark arena',
      values: [
        { name: 'dark arena', value: '#080812' },
        { name: 'deep blue', value: '#0b1020' },
        { name: 'light', value: '#f8fafc' },
      ],
    },
  },
};

export default preview;
