import type { Meta, StoryObj } from '@storybook/react';
import ChatMessage from './ChatMessage';
import { IMessage } from '@/app/globalContext/types';
import { ChatConversation } from '@/types/chat';

const meta: Meta<typeof ChatMessage> = {
  title: 'Chat/ChatMessage',
  component: ChatMessage,
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

const user: ChatConversation = {
  user: {
    id: 1,
    email: 'asartist@example.com',
    schoolId: 0,
    status: 0,
    name: 'ayaz',
  },
  id: 1,
  lastMessageReceived: '2023-06-11T10:00:00Z',
  messages: [
    {
      id: 1,
      message: 'Hello, how are you?',
      created_at: '2023-06-11T09:00:00Z',
      message_deleted_by: [],
      attachments: [
        {
          id: 1,
          file_path: '/assets/messages/attachment1.svg',
        },
      ],
    },
  ],
  schoolId: 1,
  users: [1, 2],
};

const message: IMessage = {
  id: 1,
  message:
    '尽管我们的文化背景和生活方式完全不同，但我们的联系却很深。慢慢地告诉我，我们所有人的共同点比我们想象的要多得多。全不同，但我们的联系却很深。慢慢地告诉我，我们所有人的共同点比我们想象的要多得多同，但我们的联系却很深。慢慢地告诉我，我们所有人的共同点比我们想象的要多得多。全不同同，但我们的联系却很深。慢慢地告诉我，我们所有人的共同点比我们想象的要多得多。全不同',
  created_at: '2021-10-10',
  attachments: [],
  message_deleted_by: [],
};

export const ChatMessageItem: Story = {
  render: (args) => (
    <div>
      <ChatMessage {...args} />
    </div>
  ),
  args: {
    userImage: '/assets/profile/profile.svg',
    messages: message,
    conversation: user,
    showProfile: true,
    showDate: true,
    isCurrentUser: false,
  },
};
