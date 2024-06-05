import type { Meta, StoryObj } from '@storybook/react';
import { ChatHeader } from './ChatHeader';
import { ChatUser } from '@/app/gobalContext/types';

const meta: Meta<typeof ChatHeader> = {
  title: 'Chat/ChatHeader',
  component: ChatHeader,
};

export default meta;
type Story = StoryObj<typeof ChatHeader>;

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

export const ChatHeaderItems: Story = {
  render: (args) => (
    <div>
      <ChatHeader {...args} />
    </div>
  ),
  args: {
    user: user,
  },
};
