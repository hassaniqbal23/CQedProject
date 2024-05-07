import type { Meta, StoryObj } from '@storybook/react';
import { HoverCardDemo } from './hover-card';

const meta = {
  title: 'Ui/HoverCard',
  component: HoverCardDemo,

  tags: ['autodocs'],
} as Meta<typeof HoverCardDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <HoverCardDemo {...args} />
      </>
    );
  },
  args: {
    avatarSrc: 'https://github.com/shadcn.png',
    username: '@username',
    description: 'The React Framework – created and maintained by @vercel.',
    joinedDate: new Date('2024-12-01'),
  },
};
