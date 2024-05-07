import type { Meta, StoryObj } from '@storybook/react';
import CardDemo from './card';

const meta = {
  title: 'Ui/Card',
  component: CardDemo,

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <CardDemo {...args} />
      </div>
    );
  },
  args: {
    title: 'Create project',
    description: 'Deploy your new project in one-click.',
  },
};
