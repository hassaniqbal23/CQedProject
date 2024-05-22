import type { Meta, StoryObj } from '@storybook/react';
import { ChatUserList } from './ChatUserList';

const meta: Meta<typeof ChatUserList> = {
  title: 'Chat/ChatUserList',
  component: ChatUserList,
};

export default meta;
type Story = StoryObj<typeof ChatUserList>;

export const PostWithImage: Story = {
  render: (args) => (
    <div>
      <ChatUserList {...args} />
    </div>
  ),
  args: {
    users: [
      {
        id: 1,
        userImage: '/assets/profile/profile.svg',
        userFullName: 'ASArtist',
        description: 'A little, but mostly just for take ',
      },
      {
        id: 2,
        userImage: '/assets/profile/profile.svg',
        userFullName: 'Jackiemoonie',
        description: 'Get better and better, I think I',
      },
      {
        id: 3,
        userImage: '/assets/profile/profile.svg',
        userFullName: 'Moominmadness',
        description: 'Hahahah that’s great',
      },
    ],
  },
};
