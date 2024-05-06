import type { Meta, StoryObj } from '@storybook/react';

import Coummuntiycard from './communtiycard'

const meta: Meta<typeof Coummuntiycard> = {
  title: 'Blog/BlogPost',
  component: Coummuntiycard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Coummuntiycard>;

export const communtiycard: Story = {
    render: (args) =>(
        <div>
          <Coummuntiycard {...args} />
        </div>
      ),
 
   args :{
    totalMembers:100,
    totalDiscussions:150000,
    imageSrc:'/assets/profile/profile.svg',
    title:'Volunteering around'
   }
  }
  
 
