// src/components/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ClassesCard } from './ClassesCard';
import teacherIcon from '../../../public/teacherIcon.svg';

const meta: Meta<typeof ClassesCard> = {
  component: ClassesCard,
  title: 'ui/ClassesCard',
};

export default meta;
type Story = StoryObj<typeof ClassesCard>;

export const Default: Story = {
  args: {
    name: 'Mr. Gregor Perelman',
    subject: 'Mathematics',
    imageUrl: teacherIcon,
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    name: 'Mrs. India Jones',
    subject: 'History',
    imageUrl: teacherIcon,
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    name: 'Mrs. India Jones',
    subject: 'Geography',
    imageUrl: teacherIcon,
    variant: 'secondary',
  },
};
