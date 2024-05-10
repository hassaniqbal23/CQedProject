import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'Ui/Typography',
  component: Typography,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographyC: Story = {
  render: (args) => {
    return <Typography {...args}>Main Heading Bold</Typography>;
  },
  args: {
    className: '',
    variant: 'h1',
    weight: 'bold',
  },
};
