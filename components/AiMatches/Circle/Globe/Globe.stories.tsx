import type { Meta, StoryObj } from '@storybook/react';
import { Globe } from './Globe';

const meta: Meta<typeof Globe> = {
  title: 'AiMatches/Earth',
  component: Globe,
};

export default meta;

type Story = StoryObj<typeof Globe>;

export const chatDafualt: Story = {
  args: {},
};
