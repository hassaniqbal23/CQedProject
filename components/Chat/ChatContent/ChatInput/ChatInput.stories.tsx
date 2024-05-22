import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './ChatInput';

const meta: Meta<typeof ChatInput> = {
  title: 'Chat/ChatInput',
  component: ChatInput,
};

export default meta;

type Story = StoryObj<typeof ChatInput>;

export const chatDafualt: Story = {
  render: () => {
    return (
      <div className="flex flex-col justify-end h-screen">
        <ChatInput />
      </div>
    );
  },
};
