import type { Meta, StoryObj } from '@storybook/react';
import { Post } from './Post';

const meta: Meta<typeof Post> = {
  title: 'UI/Post',
  component: Post,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Post>;

export const PostWithImage: Story = {
  render: (args) => (
    <div>
      <Post {...args} />
    </div>
  ),
  args: {
    userFullName: 'Alexander John',
    username: 'alexander john',
    userImage: '/assets/profile/profile.svg',
    created_at: '2021-10-10T00:00:00.000Z',
    description:
      'You can’t buy happiness, but you can get happiness on the beach! This is labuan bajo, Indonesiaa',
    attachment: ['/assets/images/img.png'],
    likes: 0,
    comments: 0,
    handleComment: () => {
      alert('hello');
    },
  },
};
export const PostWithoutImage: Story = {
  render: (args) => (
    <div className="">
      <Post {...args} />
    </div>
  ),
  args: {
    userFullName: 'Johanes Stim',
    username: 'Johanes Stim',
    userImage: '/assets/profile/profile.svg',
    created_at: '2021-10-10T00:00:00.000Z',
    description:
      'No Point in unpacking... I’m ready to go another vacation soon!',

    likes: 0,
    comments: 0,
    handleComment: () => {
      alert('hello');
    },
  },
};
