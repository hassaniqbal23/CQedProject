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
        title: 'Senior Professor',
        location: 'United Kingdom',
        institution: 'Massachusetts Institute of Technology (MIT)',
        startDate: 'Dec 2019 ',
        endDate: 'Present',
      },
      {
        id: '2',
        title: 'English Teacher',
        location: 'United Kingdom',
        institution: 'Massachusetts Institute of Technology (MIT)',
        startDate: 'Dec 2019 ',
        endDate: 'Present',
      },
    ],
  },
};
