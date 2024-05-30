import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NewFeeds } from './NewFeeds';
const meta: Meta<typeof NewFeeds> = {
  title: 'StaticPostInput',
  component: NewFeeds,
};

export default meta;

type StoryArgs = React.ComponentProps<typeof NewFeeds>;

export const Default: StoryObj<StoryArgs> = {
  render: (args) => <NewFeeds {...args} />,
  args: {
    userImage: '/avatar2.svg',
  },
};
