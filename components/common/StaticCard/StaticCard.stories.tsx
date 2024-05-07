import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StaticCard } from './StaticCard';

const meta = {
  title: 'Ui/StaticCard',
  component: StaticCard,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof StaticCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="w-[270px]">
        <StaticCard {...args} />
      </div>
    );
  },
  args: {
    title: 'Title',
    number: 100,
    percentage: 20,
  },
};

export const Multiple: Story = {
  render: (args) => {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 w-screen">
        <StaticCard {...args} />
        <StaticCard {...args} />
        <StaticCard {...args} />
        <StaticCard {...args} />
      </div>
    );
  },
  args: {
    title: 'Title',
    number: 100,
    percentage: 20,
  },
};
