import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Label } from '../label/label';
import { PublishStoryDialog } from './PublishStoryDialog';

const meta: Meta<typeof PublishStoryDialog> = {
  title: 'Forms/PublishStoryDialog',
  component: PublishStoryDialog,
};

export default meta;
type Story = StoryObj<typeof PublishStoryDialog>;

export const primary = () => (
  <PublishStoryDialog onPublish={() => {}}>
    <button>Send Story</button>
  </PublishStoryDialog>
);
