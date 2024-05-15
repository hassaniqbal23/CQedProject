import type { Meta, StoryObj } from '@storybook/react';
import { ChatHeader } from './ChatHeader';
import iconMenu from '@/public/IconsMenu.svg'

const meta: Meta<typeof ChatHeader> = {
  title: 'Chat/ChatHeader',
  component: ChatHeader
  
};

export default meta;
type Story = StoryObj<typeof ChatHeader>;

export const PostWithImage: Story = {
  render: (args) => (
    <div>
      <ChatHeader {...args}
      iconMenu={ iconMenu }
      />
    </div>
  ),
  args: {

   
    
      
        
        userImage: '/assets/profile/profile.svg',
        userFullName: 'ASArtist',
        description: 'Online..',
        
  
}

}