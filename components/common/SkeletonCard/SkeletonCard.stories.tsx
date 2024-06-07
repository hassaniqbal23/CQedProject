import SkeletonCard from './SkeletonCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SkeletonCard> = {
  title: 'Ui/SkeletonCard',
  component: SkeletonCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    noOfCards: {
      control: 'number',
      description: 'The number of skeleton cards to display.',
      defaultValue: 4,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-screen">
      <SkeletonCard {...args} />
    </div>
  ),
  args: {
    noOfCards: 4,
  },
};

export const MultiSkeletonCard: Story = {
  render: (args) => (
    <div className="w-screen">
      <SkeletonCard {...args} />
    </div>
  ),
  args: {
    noOfCards: 6,
  },
};

export const SingleSkeletonCard: Story = {
  render: (args) => (
    <div className="w-screen">
      <SkeletonCard {...args} />
    </div>
  ),
  args: {
    noOfCards: 1,
  },
};
