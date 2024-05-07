import type { Meta, StoryObj } from '@storybook/react';
import { TooltipDemo } from './tooltip';

const meta = {
  title: 'Ui/Tooltip',
  component: TooltipDemo,

  tags: ['autodocs'],
} as Meta<typeof TooltipDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithContent: Story = {
  render: (args) => {
    return (
      <>
        <TooltipDemo {...args} />
      </>
    );
  },
  args: {
    tooltipContent: 'tooltip message.',
  },
};
