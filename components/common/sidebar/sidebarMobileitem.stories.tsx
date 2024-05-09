import type { Meta, StoryObj } from '@storybook/react';

import SidebarMobileItem from './sidebarMobileItem';
import { ISidebar } from './types';

const sidebarLink: ISidebar = {
  icon: '/assets/sidebaricons/accounts.svg',
  title: 'Dashboard',
  path: '/admin/dashboard',
};

const meta = {
  title: 'UI/Sidebar/SidebarMobileItem',
  component: SidebarMobileItem,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SidebarMobileItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebarLinks: sidebarLink,
    pathname: '/admin/dashboard',
  },
};
