import type { Meta, StoryObj } from '@storybook/react';

import DashboardStaticCards from './index';

const meta = {
  title: 'Ui/DashboardStaticCards',
  component: DashboardStaticCards,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DashboardStaticCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [],
  },
};
