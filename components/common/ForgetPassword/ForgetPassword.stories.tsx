import type { Meta, StoryObj } from '@storybook/react';

import { ForgetPassword } from '@/components/common/ForgetPassword/ForgetPassword';

const meta = {
  title: 'Forms/ForgetPassword',
  component: ForgetPassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ForgetPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { onClick: () => console.log('Back Page') },
};
