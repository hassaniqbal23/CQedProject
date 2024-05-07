import type { Meta, StoryObj } from '@storybook/react';

import { CreateProfile } from './create-profile';

const meta: Meta<typeof CreateProfile> = {
  title: 'Ui/TeacherProfile',
  component: CreateProfile,
};

export default meta;
type Story = StoryObj<typeof CreateProfile>;

export const Default: Story = {
  args: {
    labal: 'country',
  },
};
