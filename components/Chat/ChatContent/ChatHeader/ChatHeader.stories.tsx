import type { Meta, StoryObj } from '@storybook/react';
import { ChatHeader } from './ChatHeader';
import { ChatConversation } from '@/types/chat';

const meta: Meta<typeof ChatHeader> = {
  title: 'Chat/ChatHeader',
  component: ChatHeader,
};

export default meta;
type Story = StoryObj<typeof ChatHeader>;

export const ChatHeaderItems: Story = {
  render: (args) => (
    <div>
      <ChatHeader {...args} />
    </div>
  ),
  args: {
    conversation: user,
  },
};
