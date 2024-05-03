import type { Meta, StoryObj } from '@storybook/react';
import { BlogPost } from './blogPost';

const meta: Meta<typeof BlogPost> = {
  title: 'Blog/BlogPost',
  component: BlogPost,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlogPost>;

export const Default: Story = {};
export const Primary: Story = {};
