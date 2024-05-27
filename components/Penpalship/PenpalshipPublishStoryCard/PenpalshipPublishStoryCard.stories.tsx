import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PenpalshipPublishStoryCard } from './PenpalshipPublishStoryCard';

const meta: Meta<typeof PenpalshipPublishStoryCard> = {
  title: 'Penpalship/PenpalshipPublishStory',
  component: PenpalshipPublishStoryCard,
};

export default meta;

type Story = StoryObj<typeof PenpalshipPublishStoryCard>;

export const StoriesCard: Story = {
  render: (args) => (
    <div>
      <PenpalshipPublishStoryCard
        {...args}
        title="Publish your story"
        iconOnClick={() => {
          console.log('uplode your image');
        }}
      />
    </div>
  ),
};
