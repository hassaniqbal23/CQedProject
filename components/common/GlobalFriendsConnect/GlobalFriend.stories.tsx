import type { Meta, StoryObj } from '@storybook/react';

import { GlobalFriendConnect } from './GlobalFriend';
const meta: Meta<typeof GlobalFriendConnect> = {
  title: 'Dashboard/GlobalFriends',
  component: GlobalFriendConnect,
};

export default meta;
type Story = StoryObj<typeof GlobalFriendConnect>;

export const Default: Story = {
  args: {
    name: 'William Johnson',
    username: 'williamjohnson',
    imageUrl: '/teacherIcon.svg',
  },
};
