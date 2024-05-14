import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CummunityHeader from './CommunityHeader';
import worldHand from '@/public/worldHand.svg';
import World from '@/public/World.svg';
const meta: Meta<typeof CummunityHeader> = {
  title: 'Ui/CommunityHeader',
  component: CummunityHeader,
};

export default meta;

type Story = StoryObj<typeof CummunityHeader>;

export const Default: Story = {
  render: (args) => (
    <CummunityHeader
      {...args}
      title="Find your CQED Community"
      subtitle="From gaming, to music, to learning, there’s a place for you."
      description="What are CQED Communities?"
      image1={worldHand}
      image2={World}
      onInputChange={() => {
        console.log('onInputChange');
      }}
    />
  ),
};
