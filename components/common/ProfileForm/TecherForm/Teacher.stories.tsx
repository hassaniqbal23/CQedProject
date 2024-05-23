import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TeacherForm } from './Teacher';

const meta: Meta<typeof TeacherForm> = {
  title: 'Forms/Teacher Form',
  component: TeacherForm,
};

export default meta;

type Story = StoryObj<typeof TeacherForm>;

export const Default: Story = {
  render: (args) => <TeacherForm {...args} />,
  args: {
    title: 'Profile Information',
    buttonOnClick: () => {},
  },
};
