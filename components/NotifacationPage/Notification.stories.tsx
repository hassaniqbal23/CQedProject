import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './NotificationPage';

const meta: Meta<typeof Notification> = {
  title: 'Notification',
  component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Seen: Story = {
  render: (args) => <Notification {...args} />,
  args: {
    avatar: '/avatar1.svg',
    message: 'Your Invitation has been accepted',
    name: 'tokyointernationalschool@',
    time: '08:20 pm',
    seen: true,
  },
};

export const Unseen: Story = {
  render: (args) => <Notification {...args} />,
  args: {
    avatar: '/avatar2.svg',
    message: 'Your Invitation has been accepted',
    name: 'stmaryhighschool@',
    time: '30 Minutes ago',
    seen: false,
  },
};

export const JoinInvite: Story = {
  render: (args) => <Notification {...args} />,
  args: {
    avatar: '/avatar2.svg',
    message: 'Invite you to join their group',
    boldName: 'ASArtist',
    name: 'stmaryhighschool@',
    time: '08:20 pm',
    seen: false,
    onClickJoin: () => {},
    onClickReject: () => {},
  },
};
