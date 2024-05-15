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
  args: {
    date: '2021-10-10',
    userImage: '/assets/profile/profile.svg',
    content:
      '尽管我们的文化背景和生活方式完全不同，但我们的联系却很深。慢慢地告诉我，我们所有人的共同点比我们想象的要多得多。',

    UserMessage:
      'I’ve a beautiful family of penpals who write to me on a constant basis and they never fail to bring a smile to my face.',
  },
};
