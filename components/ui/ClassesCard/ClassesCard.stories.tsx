import type { Meta, StoryObj } from '@storybook/react';
import { ClassesCard } from './ClassesCard';

const meta: Meta<typeof ClassesCard> = {
  component: ClassesCard,
  title: 'ui/ClassesCard',
};

export default meta;
type Story = StoryObj<typeof ClassesCard>;

export const Default: Story = {
  render: (args) => {
    return <ClassesCard {...args} />;
  },
  args: {
    name: 'Mr. Gregor Perelman',
    subject: 'Mathematics',
    imageUrl: '/teacherIcon.svg',
    variant: 'default',
  },
};

export const Primary: Story = {
  render: (args) => {
    return <ClassesCard {...args} />;
  },
  args: {
    name: 'Mrs. India Jones',
    subject: 'History',
    imageUrl: '/teacherIcon.svg',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  render: (args) => {
    return <ClassesCard {...args} />;
  },
  args: {
    name: 'Mrs. India Jones',
    subject: 'Geography',
    imageUrl: '/teacherIcon.svg',
    variant: 'secondary',
  },
};
