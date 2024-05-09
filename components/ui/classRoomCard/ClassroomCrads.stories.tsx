import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Card from './ClassroomCrads';

const meta: Meta<typeof Card> = {
  title: 'ui/SchoolCards',
  component: Card,
};

export default meta;

type StoryArgs = React.ComponentProps<typeof Card>;

export const Default: StoryObj = {
  render: (args) => (
    <Card
      {...args}
      title="Grade 7th"
      studentCount=" 23 Student "
      buttonText="View Class"
      buttonOnClick={() => {
        console.log('clicked');
      }}
    />
  ),
};

export const primary: StoryObj = {
  render: (args) => (
    <Card
      {...args}
      title="Grade 8th"
      studentCount=" 50 Student "
      buttonText="View Class"
      buttonOnClick={() => {
        console.log('clicked');
      }}
    />
  ),
};
