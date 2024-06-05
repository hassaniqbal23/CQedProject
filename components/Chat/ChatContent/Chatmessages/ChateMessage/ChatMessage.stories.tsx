import type { Meta, StoryObj } from '@storybook/react';
import ChatMessage from './ChatMessage';
import { ChatUser, IMessage } from '@/app/gobalContext/types';

const meta: Meta<typeof ChatMessage> = {
  title: 'Chat/ChatMessage',
  component: ChatMessage,
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

const user: ChatUser = {
  user: {
    id: 1,
    name: 'ASArtist',
    email: 'asartist@example.com',
    attachment: {
      file_path: '/assets/profile/profile.svg',
      id: 1,
    },
  },
  id: 1,
};

const message: IMessage = {
  id: 1,
  message: '尽管我们的文化背景和生活方式完全不同，但我们的联系却很深。慢慢地告诉我，我们所有人的共同点比我们想象的要多得多。全不同，但我们的联系却很深。慢慢地告诉我，我们所有人的共同点比我们想象的要多得多同，但我们的联系却很深。慢慢地告诉我，我们所有人的共同点比我们想象的要多得多。全不同同，但我们的联系却很深。慢慢地告诉我，我们所有人的共同点比我们想象的要多得多。全不同',
  created_at: '2021-10-10',
  attachments: [],
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
    user: user,
    showProfile: true,
    showDate: true,
    isCurrentUser: false,
    hasDeleted: false,
  },
};
