import type { Meta, StoryObj } from '@storybook/react';

import Navbar from './MainBar';

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/MainBar',
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {},
};
