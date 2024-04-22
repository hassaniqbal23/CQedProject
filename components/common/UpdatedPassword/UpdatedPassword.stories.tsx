import type { Meta, StoryObj } from '@storybook/react';

import { UpdatedPassword } from '@/components/common/UpdatedPassword/UpdatedPassword';

const meta = {
  title: 'Ui/UpdatedPassword',
  component: UpdatedPassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UpdatedPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
