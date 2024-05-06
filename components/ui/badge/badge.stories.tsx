import type { Meta, StoryObj } from '@storybook/react';

import { Badge, badgeVariants } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Ui/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const secondary: Story = {
  args: {
    children: 'Badge',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Badge',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Badge',
    variant: 'destructive',
  },
};
