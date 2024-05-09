import type { Meta, StoryObj } from '@storybook/react';

import StudentsDetailsFrom from './index';

const meta = {
  title: 'UI/Student/StudentsDetailsFrom',
  component: StudentsDetailsFrom,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof StudentsDetailsFrom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
