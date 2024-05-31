import type { Meta, StoryObj } from '@storybook/react';
import ChatMessages from './ChatMessages';

const meta: Meta<typeof ChatMessages> = {
  title: 'Chat/ChatMessages',
  component: ChatMessages,
};

export default meta;
type Story = StoryObj<typeof ChatMessages>;

export const ChatMessagesItems: Story = {
  render: (args) => (
    <div>
      <ChatMessages {...args} />
    </div>
  ),
  args: {},
};
