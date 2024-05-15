import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CommunityHeader } from './CommunityHeader';
import worldHand from '@/public/worldHand.svg';
import World from '@/public/World.svg';
const meta: Meta<typeof CommunityHeader> = {
  title: 'Ui/CommunityHeader',
  component: CommunityHeader,
};

export default meta;

type Story = StoryObj<typeof CommunityHeader>;

export const Default: Story = {
  render: (args) => (
    <CommunityHeader
      {...args}
      title="Find your CQED Community"
      subtitle="From gaming, to music, to learning, there’s a place for you."
      description="What are CQED Communities?"
      rightImage={worldHand}
      leftImage={World}
      onInputChange={() => {
        console.log('onInputChange');
      }}
    />
  ),
};
