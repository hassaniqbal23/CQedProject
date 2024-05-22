import type { Meta, StoryObj } from '@storybook/react';
import NoChatFound from './NoChatFound';
// import translateImage from '@/public/translate.png'
const meta: Meta<typeof NoChatFound> = {
  title: 'Chat/NoChatFound',
  component: NoChatFound,
};

export default meta;
type Story = StoryObj<typeof NoChatFound>;

export const ChatContentItems: Story = {
  args: {
    text: 'No Chat Found',
  },
};
