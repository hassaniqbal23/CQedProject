import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileHeader } from './Header';

const meta = {
  title: 'Profiles/ProfileHeader',
  component: ProfileHeader,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileHeaderComponents: Story = {
  render: (args) => {
    return <ProfileHeader {...args} />;
  },
  args: {
    name: 'Minerva McGonagall',
    role: '10th Grade Geometry at ',
    subrole: ' Oak Ridge H.S.',
    location: 'Glenwood, CA',
    imageSize: {
      width: 150,
      height: 150,
    },
    profileIcon: '/assets/profile/teacherprofile.svg',
  },
};
export const ProfileHeaderComponentsButton: Story = {
  render: (args) => {
    return <ProfileHeader {...args} />;
  },
  args: {
    name: 'Minerva McGonagall',
    imageSize: {
      width: 100,
      height: 100,
    },
    buttonProps: {
      isVisbile: true,
      onClick: () => {},
      buttonText: 'Messages',
    },
    profileIcon: '/assets/profile/teacherprofile.svg',
  },
};
