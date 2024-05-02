import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from './calender';

const meta: Meta<typeof Calendar> = {
  title: 'Ui/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    mode: 'single',
  },
};
