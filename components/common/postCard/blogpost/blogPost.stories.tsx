import type { Meta, StoryObj } from '@storybook/react';
import { BlogPost } from './blogPost';

const meta: Meta<typeof BlogPost> = {
  title: 'Blog/BlogPost',
  component: BlogPost,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlogPost>;

export const blogwithImage: Story = {
  render: (args) =>(
    <div>
      <BlogPost {...args} />
    </div>
  ),
  args : {
    userFullName : 'Alexander John',
    username: 'alexander john',
    userImage:'/assets/profile/profile.svg',
    created_at: '2021-10-10T00:00:00.000Z',
    description: 'You can’t buy happiness, but you can get happiness on the beach! This is labuan bajo, Indonesiaa',
    attachment: ['/assets/images/img.png'],
    likes: 0,
    comments: 0,
    onComplete :()=>{
      alert('hello')
    }
   
  }
  
 
};
export const blogwithoutImage: Story = {
  render: (args) =>(
    <div className=''>
      <BlogPost {...args} />
    </div>
  ),
  args : {
    userFullName : 'Johanes Stim',
    username: 'Johanes Stim',
    userImage:'/assets/profile/profile.svg',
    created_at: '2021-10-10T00:00:00.000Z',
    description: 'No Point in unpacking... I’m ready to go another vacation soon!',
    
    likes: 0,
    comments: 0,
    onComplete :()=>{
      alert('hello')
    }
  }
}
;
