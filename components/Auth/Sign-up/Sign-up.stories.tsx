import type { Meta, StoryObj } from '@storybook/react';
import { SignUpPage } from './Sign-up';

const meta = {
  title: 'Auth/SignUp-Page',
  component: SignUpPage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SignUpPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <>
        <SignUpPage {...args} />
      </>
    );
  },
  args: {
    forgetPasswordLink: '/forget-password',
    loginSuccessLink: '/',
    loginWithGoogleORFacebook: '/login-google-facebook',
    signinLink: '/sign-in',
  },
};
