import type { Meta, StoryObj } from '@storybook/react';

import { UpdatePassword } from '@/components/common/UpdatePassword/UpdatePassword';

const meta = {
  title: 'Forms/UpdatePassword',
  component: UpdatePassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UpdatePassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
