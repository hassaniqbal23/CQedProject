import type { Meta, StoryObj } from '@storybook/react';
import { CommentInput } from './CommentInput';

const meta: Meta<typeof CommentInput> = {
  title: 'Blog/CommentInput',
  component: CommentInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CommentInput>;

export const CommentInputBox: Story = {
  render: (args) => {
    return <CommentInput />;
  },
  args: {},
};
