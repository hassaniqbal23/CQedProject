import type { Meta, StoryObj } from '@storybook/react';
import ChatContent from './ChatContent';
// import translateImage from '@/public/translate.png'
const meta: Meta<typeof ChatContent> = {
  title: 'Chat/ChatContent',
  component: ChatContent,
};

export default meta;
type Story = StoryObj<typeof ChatContent>;

export const ChatContentItems: Story = {};
