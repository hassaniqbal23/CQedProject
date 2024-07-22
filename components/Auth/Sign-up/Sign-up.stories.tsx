import type { Meta, StoryObj } from '@storybook/react';
import { SignUp } from './Sign-up';

const meta = {
  title: 'Auth/SignUp-Page',
  component: SignUp,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <>
        <SignUp {...args} />
      </>
    );
  },
  args: {
    forgetPasswordLink: '/forget-password',
    loginSuccessLink: '/',
    role: 'student',
    loginWithGoogleORFacebook: '/login-google-facebook',
    signinLink: '/sign-in',
  },
};
