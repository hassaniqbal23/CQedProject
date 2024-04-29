import type { Meta, StoryObj } from '@storybook/react';
import { ForgetPasswordSuccess } from '@/components/common/ForgetPasswordSuccess/ForgetPasswordSuccess';

const meta = {
  title: 'Forms/ForgetPasswordSuccess',
  component: ForgetPasswordSuccess,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ForgetPasswordSuccess>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    email: "john@domain.com",
    backLink: "/login",
  }
};
