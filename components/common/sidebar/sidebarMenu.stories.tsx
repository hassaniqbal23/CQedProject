import type { Meta, StoryObj } from '@storybook/react';

import SidebarMenu from './sidebarMenu';
import { ISidebar } from './types';

const sidebarLinks: ISidebar[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: '/assets/sidebaricons/dashboard.svg',
  },
  {
    path: '/courses',
    title: 'Courses',
    icon: '/assets/sidebaricons/cqCourses.svg',
  },
  {
    path: '/settings',
    title: 'Settings',
    icon: '/assets/sidebaricons/settings.svg',
  },
];

const meta = {
  title: 'UI/Sidebar/SidebarMenu',
  component: SidebarMenu,
  tags: ['autodocs'],
  argTypes: {
    isVerticalIcon: { control: { type: 'boolean' } },
  },
} satisfies Meta<typeof SidebarMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebarLinks,
    pathname: '/dashboard',
    isVerticalIcon: false,
  },
};

export const VerticalIcon: Story = {
  args: {
    sidebarLinks,
    pathname: '/dashboard',
    isVerticalIcon: true,
  },
};
