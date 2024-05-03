import React from 'react';
import { Meta } from '@storybook/react';
import DashboardCard from '@/components/ui/dashboardCard/dashboardCard';
import friendsIcon from '@/public/Friends.svg';
import Diversity from '@/public/Diversity.svg';
import Online_course from '@/public/Online course.svg';

const meta: Meta = {
  title: 'dashboard card',
  component: DashboardCard,

  // tags: ['autodocs'],
};

console.log(friendsIcon);

export default meta;

export const Default = (args: any) => (
  <div>
    <DashboardCard
      title="CQ Challenges"
      description="Participate in a Challenge  and Win different Prizes Start"
      buttonOnClick={() => {}}
      buttonText="Start"
      icon={Diversity.blurDataURL}
      cardType="default"
    />
  </div>
);

export const primary = (args: any) => (
  <div>
    <DashboardCard
      title="Penpalship"
      description="Make a Global Friend"
      buttonOnClick={() => {}}
      buttonText=" Start"
      icon={friendsIcon.blurDataURL}
      cardType="primary"
    />
  </div>
);

export const secondary = (args: any) => (
  <div>
    <DashboardCard
      title="CQ Courses"
      description="Become Culturally intelligent by learning about different cultures"
      buttonOnClick={() => {}}
      buttonText=" Start"
      icon={Online_course.blurDataURL}
      cardType="secondary"
    />
  </div>
);
