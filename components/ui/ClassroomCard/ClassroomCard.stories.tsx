import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ClassroomCard } from './ClassroomCard';

const meta: Meta<typeof ClassroomCard> = {
  title: 'UI/ClassroomCards',
  component: ClassroomCard,
};

export default meta;

type StoryArgs = React.ComponentProps<typeof ClassroomCard>;

export const Default: StoryObj = {
  render: (args) => (
    <ClassroomCard
      {...args}
      title="Grade 7th"
      studentCount={20}
      buttonText="View Class"
      buttonOnClick={() => {
        console.log('clicked');
      }}
    />
  ),
};

export const primary: StoryObj = {
  render: (args) => (
    <ClassroomCard
      {...args}
      title="Grade 8th"
      studentCount={50}
      buttonText="View Class"
      buttonOnClick={() => {
        console.log('clicked');
      }}
    />
  ),
};
