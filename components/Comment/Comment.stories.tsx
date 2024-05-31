import type { Meta, StoryObj } from '@storybook/react';
import { Comment } from './Comment';

const meta: Meta<typeof Comment> = {
  title: 'Blog/Comment',
  component: Comment,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Comment>;

export const Comments: Story = {
  render: (args) => {
    return <Comment {...args} />;
  },
  args: {
    user: 'Jenny Wilson',
    text: 'Looks amazing and breathtaking. Been there, beautiful!',
    avatarUrl: '/assets/profile/teacherprofile.svg',
  },
};
