import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchFilter } from './SearchFilter';

const meta: Meta<typeof SearchFilter> = {
  title: 'SearchFilter',
  component: SearchFilter,
};

export default meta;
type Story = StoryObj<typeof SearchFilter>;

export const Default: Story = {
  render: (args) => {
    return <SearchFilter {...args} />;
  },
  args: {
    buttonText: 'Back',
    title: 'Search Result for Kids',
  },
};
