import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileWorkHistory } from './WorkHistory';

const meta = {
  title: 'Profiles/ProfileWorkHistory',
  component: ProfileWorkHistory,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof ProfileWorkHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileWorkHistoryComponents: Story = {
  render: (args) => {
    return <ProfileWorkHistory {...args} />;
  },
  args: {
    title: 'Work History',
    jobs: [
      {
        id: '1',
        company: 'Massachusetts Institute of Technology (MIT)',
        role: 'Simply Design',
        duration: 'Dec 2019 - Present',
      },
      {
        id: '2',
        company: 'Harvard University',
        role: 'Simply Design',
        duration: 'Dec 2019 - Present',
      },
    ],
  },
};
