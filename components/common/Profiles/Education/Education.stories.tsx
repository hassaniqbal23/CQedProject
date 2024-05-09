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
    title: 'Education',
    jobs: [
      {
        id: '1',
        company: 'Mater’s degree in information Technolog',
        role: 'Simply Design',
        duration: 'Dec 2019 - Present',
      },
      {
        id: '2',
        company: 'Mater’s degree in information Technologyy',
        role: 'Simply Design',
        duration: 'Dec 2019 - Present',
      },
    ],
  },
};
