import type { Meta, StoryObj } from '@storybook/react';
import { CreatePostModal } from './CreatePostModal';

const meta = {
  title: 'Forms/CreatePostModal',
  component: CreatePostModal,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof CreatePostModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreatePost: Story = {
  render(args) {
    return (
      <div>
        <CreatePostModal {...args} />
      </div>
    );
  },
  args: {
    icon: '/upload.svg',
    title: 'Create a post',
    buttonTrigger: 'Post',
    buttonAction: 'Publish',
  },
};
