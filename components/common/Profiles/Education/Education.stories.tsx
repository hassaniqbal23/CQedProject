import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileEducation } from './Education';

const meta = {
  title: 'Profiles/ProfileEducation',
  component: ProfileEducation,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof ProfileEducation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileEducationComponents: Story = {
  render: (args) => {
    return <ProfileEducation {...args} />;
  },
  args: {
    title: 'My Education',
    jobs: [
      {
        id: '1',
        educationLevel: "Master's",
        fieldOfStudy: 'Information Techonology',
        countryCode: 'United Kingdom',
        institution: 'Stanford University',
        startDate: 'Dec 2019 ',
        endDate: 'Present',
      },
      {
        id: '2',
        educationLevel: "Master's",
        fieldOfStudy: 'Information Techonology',
        countryCode: 'United Kingdom',

        institution: 'Stanford University',
        startDate: 'Dec 2019 ',
        endDate: 'Present',
      },
    ],
  },
};
