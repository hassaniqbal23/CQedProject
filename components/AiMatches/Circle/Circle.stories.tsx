import type { Meta, StoryObj } from '@storybook/react';
import { CircleIcon } from './Circle';

const meta: Meta<typeof CircleIcon> = {
  title: 'AiMatches/CircleIcon',
  component: CircleIcon,
};

export default meta;

type Story = StoryObj<typeof CircleIcon>;

export const chatDafualt: Story = {
  render: (args) => (
    <div className="">
      <CircleIcon {...args} />
    </div>
  ),
  args: {
    userImage: '/assets/profile/profile.svg',
  },
};
