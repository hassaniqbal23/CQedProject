import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Meta } from '@storybook/react';
import { ScrollAreaDemo, ScrollArea } from './scroll-area';

const meta: Meta = {
  title: 'Ui/ScrollArea',
  component: ScrollAreaDemo,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
{
}

export const Vertical: Story = {
  args: {
    variant: 'vertical',
    verticalItems: [
      {
        title: 'Vertical Item 1',
        description: 'Description 1',
        className: 'class1',
      },
      {
        title: 'Vertical Item 2',
        description: 'Description 2',
        className: 'class2',
      },
      {
        title: 'Vertical Item 3',
        description: 'Description 3',
        className: 'class3',
      },
      {
        title: 'Vertical Item 1',
        description: 'Description 1',
        className: 'class1',
      },
      {
        title: 'Vertical Item 2',
        description: 'Description 2',
        className: 'class2',
      },
      {
        title: 'Vertical Item 3',
        description: 'Description 3',
        className: 'class3',
      },
      {
        title: 'Vertical Item 1',
        description: 'Description 1',
        className: 'class1',
      },
      {
        title: 'Vertical Item 2',
        description: 'Description 2',
        className: 'class2',
      },
      {
        title: 'Vertical Item 3',
        description: 'Description 3',
        className: 'class3',
      },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    variant: 'horizontal',
    horizontalItems: [
      {
        title: 'Tom Byrom',
        caption: 'Photo by',
        imgPath:
          'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
        className: 'class1',
      },
      {
        title: 'Ornella Binni',
        caption: 'Photo by',
        imgPath:
          'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
        className: 'class2',
      },
      {
        title: 'Vladimir Malyavko',
        caption: 'Photo by',
        imgPath:
          'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
        className: 'class3',
      },
    ],
  },
};
