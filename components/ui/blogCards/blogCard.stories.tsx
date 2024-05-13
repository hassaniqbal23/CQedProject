import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RectangleImage from '@/public/Rectangle.svg';
import BlogCards from '@/components/ui/blogCards/BlogCard';
import RectangleImage2 from '@/public/Rectangle2.svg';
import animal from '@/public/animal.svg';

const meta: Meta<typeof BlogCards> = {
  title: 'UI/BlogCards',
  component: BlogCards,
};

export default meta;

type Story = StoryObj<typeof BlogCards>;

export const Default: Story = {
  render: (args) => (
    <BlogCards
      {...args}
      imageUrl={RectangleImage}
      title="Sharing your culture education"
      label="5k Members"
      description="Welcome to a place from where your sharing and learn about different.."
    />
  ),
};

export const primary: Story = {
  render: (args) => (
    <BlogCards
      {...args}
      imageUrl={RectangleImage2}
      title="Sharing your culture education"
      label="5k Members"
      description="Welcome to a place from where your sharing and learn about different.."
    />
  ),
};

export const secondry: Story = {
  render: (args) => (
    <BlogCards
      {...args}
      imageUrl={animal}
      title="Sharing your culture education"
      label="5k Members"
      description="Welcome to a place from where your sharing and learn about different.."
    />
  ),
};
