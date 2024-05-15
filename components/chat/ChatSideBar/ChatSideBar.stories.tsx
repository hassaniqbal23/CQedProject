import type { Meta, StoryObj } from '@storybook/react';
import {ChatSideBar} from './ChatSideBar';

const meta: Meta<typeof ChatSideBar> = {
  title: 'Chat/ChatSideBar',
  component: ChatSideBar,
 
};

export default meta;


type Story = StoryObj<typeof ChatSideBar>;

export const PostWithImage: Story = {
  render: (args) => (
    <div>
      <ChatSideBar {...args} />
    </div>
  ),
  args: {

    chat: "Chats",
    
}

}