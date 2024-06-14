import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PublishStoryViewDialog } from './PublishStoryViewDialog';

const meta: Meta<typeof PublishStoryViewDialog> = {
  title: 'Forms/PublishStoryViewDialog',
  component: PublishStoryViewDialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PublishStoryViewDialog>;

export const PublishStoryView = () => (
  <PublishStoryViewDialog
    initialValue="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti laboriosam cupiditate repellendus eius! Aperiam totam illum, ducimus iusto labore doloremque quis iste saepe, eligendi accusantium error, ex aspernatur ullam non.
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti laboriosam cupiditate repellendus eius! Aperiam totam illum, ducimus iusto labore doloremque quis iste saepe, eligendi accusantium error, ex aspernatur ullam non.
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti laboriosam cupiditate repellendus e"
    open={false}
    userInfo={{
      userId: 12,
      username: 'Inayat - 12',
      location: 'PK',
      imageUrl: '/assets/profile/profile.svg',
    }}
  />
);
