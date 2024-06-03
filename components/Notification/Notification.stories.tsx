import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';
import { Button } from '../ui';

const meta: Meta<typeof Notification> = {
  title: 'Dashboard/Notification',
  component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Seen: Story = {
  render: (args) => <Notification {...args} />,
  args: {
    avatar: '/avatar1.svg',
    message: (
      <span>
        <b>Ilyas Karim</b> has invited you to join their group{' '}
        <a>Gaming Champs</a>
      </span>
    ),
    actions: () => {
      return (
        <>
          <Button
            onClick={() => {
              console.log('action');
            }}
            size={'sm'}
            className="rounded-full px-14"
          >
            Join
          </Button>
          <Button
            onClick={() => {
              console.log('action');
            }}
            size={'sm'}
            className="rounded-full px-14"
          >
            Reject
          </Button>
        </>
      );
    },
  },
};

// export const Unseen: Story = {
//   render: (args) => <Notification {...args} />,
//   args: {
//     avatar: '/avatar2.svg',
//     message: 'Your Invitation has been accepted',
//     name: 'stmaryhighschool@',
//     time: '30 Minutes ago',
//     seen: false,
//   },
// };

// export const JoinInvite: Story = {
//   render: (args) => <Notification {...args} />,
//   args: {
//     avatar: '/avatar2.svg',
//     message: 'Invite you to join their group',
//   },
// };

// export const rejectInvite: Story = {
//   render: (args) => <Notification {...args} />,
//   args: {
//     avatar: '/avatar2.svg',
//     message: 'Invite you to join their group',
//     boldName: 'ASArtist',
//     name: 'stmaryhighschool@',
//     time: '08:20 pm',
//     seen: true,
//     onClickJoin: () => {},
//     onClickReject: () => {},
//   },
// };
