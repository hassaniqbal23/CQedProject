import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PenpalshipStoriesCard } from './PenpalshipStoriesCard';

const meta: Meta<typeof PenpalshipStoriesCard> = {
  title: 'Penpalship/PenpalshipStoriesCard',
  component: PenpalshipStoriesCard,
};

export default meta;

type Story = StoryObj<typeof PenpalshipStoriesCard>;

export const StoriesCard: Story = {
  render: (args) => (
    <div>
      <PenpalshipStoriesCard
        {...args}
        imgPath={'/Emily.png'}
        title="Emily - 12 - UK"
        description="Hi I am Lily, an 8-year-old form United States with a passion for drawing and a heart full love"
        link="Read more"
      />
    </div>
  ),
};
