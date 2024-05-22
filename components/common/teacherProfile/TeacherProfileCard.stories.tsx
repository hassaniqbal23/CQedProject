import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TeacherProfileCard } from './TeacherProfileCard';
const meta: Meta<typeof TeacherProfileCard> = {
  title: 'Teacher/TeacherProfileCard',
  component: TeacherProfileCard,
};

export default meta;
type Story = StoryObj<typeof TeacherProfileCard>;

export const TeacherProfileList: Story = {
  render: (arg) => {
    return <TeacherProfileCard {...arg} />;
  },
  args: {
    profileImg: '/assets/teacher/EthanAvatar.svg',
    about:
      'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
    name: 'Ethan',
    buttonText: 'View Profile',
    href: '/admin',
  },
};

export const primary: Story = {
  render: (arg) => {
    return (
      <div className="w-2/6">
        <TeacherProfileCard {...arg} />;
      </div>
    );
  },
  args: {
    profileImg: '/assets/teacher/MoominAvatar.svg',
    about:
      'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
    name: 'Ethan',
    buttonText: 'View Profile',
    href: '/about',
  },
};
