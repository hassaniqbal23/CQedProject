import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSkills } from './Skills';

const meta = {
  title: 'Profiles/ProfileSkills',
  component: ProfileSkills,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof ProfileSkills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileSkillsComponents: Story = {
  render: (args) => {
    return <ProfileSkills {...args} />;
  },
  args: {
    title: 'Skills',
    skills: [
      'Communication',
      'Adaptability',
      'Classroom Management',
      'Subject Matter Expertise',
      'Adaptability',
      'Classroom Management',
      'Subject Matter Expertise',
      'Adaptability',
      'Classroom Management',
      'Subject Matter Expertise',
    ],
  },
};
