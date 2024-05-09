import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileBio } from './Bio';

const meta = {
  title: 'Profiles/ProfileBio',
  component: ProfileBio,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof ProfileBio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileBioComponents: Story = {
  render: (args) => {
    return <ProfileBio {...args} />;
  },
  args: {
    title: 'About The Teacher',
    bio: "Meet Aliyan, a spirited 12-year-old with a contagious enthusiasm for life. His bright blue eyes sparkle with curiosity, and his perpetually messy hair reflects the adventures he embarks on each day. Jake's world is filled with a kaleidoscope of interests, from building intricate LEGO masterpieces to exploring the fascinating realms of video games. With a backpack full of dreams and a heart full of laughter, Jake navigates the maze of adolescence with ",
  },
};
