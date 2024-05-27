import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import friend from '/public/friends.svg';
import diversity from '/public/diversity.svg';
import onlineCourse from '/public/online-course.svg';
import { StudentDashboardCard } from './StudentdashboardCard';

const meta: Meta<typeof StudentDashboardCard> = {
  title: 'Students/DashboardCard',
  component: StudentDashboardCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof StudentDashboardCard>;

export const Default: Story = {
  render: (args) => (
    <StudentDashboardCard
      {...args}
      title="CQ Challenges"
      description="Participate in a Challenge and Win different Prizes"
      buttonText="Start"
      buttonOnClick={() => {
        console.log('clicked');
      }}
      icon={friend}
      cardType="default"
    />
  ),
};

export const Primary: Story = {
  render: (args) => (
    <StudentDashboardCard
      {...args}
      title="Penpalship"
      description="Make a Global Friend"
      buttonText="Start"
      buttonOnClick={() => {}}
      icon={diversity}
      cardType="primary"
    />
  ),
};

export const Secondary: Story = {
  render: (args) => (
    <StudentDashboardCard
      {...args}
      title="CQ Courses"
      description="Become Culturally intelligent by learning about different cultures"
      buttonText="Start"
      buttonOnClick={() => {}}
      icon={onlineCourse}
      cardType="secondary"
    />
  ),
};
