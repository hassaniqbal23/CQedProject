import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TeacherForm from './Teacher';

const meta: Meta<typeof TeacherForm> = {
  title: 'Forms/Teacher Form',
  component: TeacherForm,
};

export default meta;

type Story = StoryObj<typeof TeacherForm>;

export const Default: StoryObj = {
  render: (args) => (
    <TeacherForm {...args} title="Profile Information" name="ksdfdkfm" />
  ),
};
