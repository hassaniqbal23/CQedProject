import type { Meta, StoryObj } from '@storybook/react';

import SidebarItem from './sidebarItem';
import { ISidebar } from './types';

const meta = {
  title: 'UI/Sidebar/SidebarItem',
  component: SidebarItem,
  tags: ['autodocs'],
  argTypes: {
    isVerticalIcon: { control: { type: 'boolean' } },
  },
} satisfies Meta<typeof SidebarItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      icon: '/assets/sidebaricons/accounts.svg',
      title: 'Home',
      path: '/admin/dashboard',
    },

    pathname: '/example-path',
    isVerticalIcon: false,
  },
};
