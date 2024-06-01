import type { Meta, StoryObj } from '@storybook/react';
import CreateChatModal from './CreateChatModal';
// import translateImage from '@/public/translate.png'
const meta: Meta<typeof CreateChatModal> = {
  title: 'Chat/CreateChatModal',
  component: CreateChatModal,
};

export default meta;
type Story = StoryObj<typeof CreateChatModal>;

export const ChatContentItems: Story = {};
