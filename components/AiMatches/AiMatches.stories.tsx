import type { Meta, StoryObj } from '@storybook/react';
import { AiMatches } from './AiMatches';

const meta: Meta<typeof AiMatches> = {
  title: 'AiMatches/AiMatches',
  component: AiMatches,
};

export default meta;

type Story = StoryObj<typeof AiMatches>;

export const chatDafualt: Story = {
  render: (args) => (
    <div className="">
      <AiMatches {...args} />
    </div>
  ),
  args: {
    showNotification: true,
  },
};
