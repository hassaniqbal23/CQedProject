import type { Meta, StoryObj } from '@storybook/react';

import { SchoolDetailsForm } from './SchoolDetailsForm';

const meta = {
  title: 'Ui/SchoolForm',
  component: SchoolDetailsForm,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SchoolDetailsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
