// stories/ProfileForm.stories.ts
import type { Meta, StoryObj } from '@storybook/react';

import { SignIn } from '@/components/common/SignIn-Page/SignInpage';

const meta = {
  title: 'Ui/SignIn-Page',
  component: SignIn,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    forgetPasswordLink : '/'
  },
};
