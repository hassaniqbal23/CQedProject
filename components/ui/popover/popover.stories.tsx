import type { Meta, StoryObj } from '@storybook/react';
import { PopoverDemo } from './popover';

const meta = {
  title: 'Ui/Popover',
  component: PopoverDemo,

  tags: ['autodocs'],
} as Meta<typeof PopoverDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <PopoverDemo {...args} />
      </>
    );
  },
  args: {
    title: 'This is Title',
    description: 'This is description',
  },
};
