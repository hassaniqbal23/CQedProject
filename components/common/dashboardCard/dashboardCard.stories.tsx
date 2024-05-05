import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import friend from '/public/Friends.svg';
import diversity from '/public/Diversity.svg';
import online_course from '/public/Online course.svg';

import DashboardCard from '@/components/common/dashboardCard/dashboardCard';

const meta: Meta<typeof DashboardCard> = {
  title: 'DashboardCard', // Title for the story section in Storybook
  component: DashboardCard,
};

export default meta;

type Story = StoryObj<typeof DashboardCard>;

export const Default: Story = {
  render: (args) => (
    <DashboardCard
      {...args}
      title="CQ Challenges"
      description="Participate in a Challenge and Win different Prizes"
      buttonText="Start"
      buttonOnClick={() => {
        console.log('clicked');
      }}
      icon={friend.blurDataURL}
      cardType="default"
    />
  ),
};

export const Primary: Story = {
  render: (args) => (
    <DashboardCard
      {...args}
      title="Penpalship"
      description="Make a Global Friend"
      buttonText="Start"
      buttonOnClick={() => {}}
      icon={diversity.blurDataURL}
      cardType="primary"
    />
  ),
};

export const Secondary: Story = {
  render: (args) => (
    <DashboardCard
      {...args}
      title="CQ Courses"
      description="Become Culturally intelligent by learning about different cultures"
      buttonText="Start"
      buttonOnClick={() => {}}
      icon={online_course.blurDataURL}
      cardType="secondary"
    />
  ),
};
