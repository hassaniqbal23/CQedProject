import type { Meta, StoryObj } from '@storybook/react';
import { ChatHeader } from './ChatHeader';
import { ChatConversation } from '@/types/chat';

const meta: Meta<typeof ChatHeader> = {
  title: 'Chat/ChatHeader',
  component: ChatHeader,
};

export default meta;
type Story = StoryObj<typeof ChatHeader>;

const user: ChatConversation = {
  user: {
    id: 1,
    email: 'asartist@example.com',
    schoolId: 0,
    status: 0,
    name: 'ayaz',
    last_active: '2023-06-11T10:00:00Z',
  },
  id: 1,
  unread_count: 0,
  lastMessageReceived: '2023-06-11T10:00:00Z',
  messages: [
    {
      id: 1,
      message: 'Hello, how are you?',
      created_at: '2023-06-11T09:00:00Z',
      attachments: [
        {
          id: 1,
          file_path: '/assets/messages/attachment1.svg',
        },
      ],
      message_deleted_by: [],
    },
  ],
  schoolId: 1,
  users: [1, 2],
};

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
