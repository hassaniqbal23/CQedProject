import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './sidebar';

const meta = {
  title: 'Ui/MainSidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainSidebar: Story = {
  render: (args) => {
    return (
      <div className="h-screen">
        <Sidebar {...args} />
      </div>
    );
  },
  args: {
    isVerticalIcon: false,
    pathname: '/admin/dashboard',
    sidebarLinks: [
      {
        icon: '/assets/sidebaricons/dashboard.svg',
        title: 'Home',
        path: '/admin/dashboard',
      },
      {
        icon: '/assets/sidebaricons/classroom.svg',
        title: 'Classrooms',
        path: '/admin/classrooms',
      },
      {
        icon: '/assets/sidebaricons/students.svg',
        title: 'Students',
        path: '/admin/students',
      },
      {
        icon: '/assets/sidebaricons/teachers.svg',
        title: 'Teachers',
        path: '/admin/teachers',
      },
      {
        icon: '/assets/sidebaricons/managements.svg',
        title: 'Management',
        path: '/admin/management',
      },
    ],
  },
};

export const VerticalSidebar: Story = {
  render: (args) => {
    return (
      <div className="h-screen">
        <Sidebar {...args} />
      </div>
    );
  },
  args: {
    isVerticalIcon: true,
    pathname: '/admin/dashboard',
    sidebarLinks: [
      {
        icon: '/assets/sidebaricons/dashboard.svg',
        title: 'Home',
        path: '/admin/dashboard',
      },
      {
        icon: '/assets/sidebaricons/classroom.svg',
        title: 'Classrooms',
        path: '/admin/classrooms',
      },
      {
        icon: '/assets/sidebaricons/students.svg',
        title: 'Students',
        path: '/admin/students',
      },
      {
        icon: '/assets/sidebaricons/teachers.svg',
        title: 'Teachers',
        path: '/admin/teachers',
      },
      {
        icon: '/assets/sidebaricons/managements.svg',
        title: 'Management',
        path: '/admin/management',
      },
    ],
  },
};

export const Horizontal: Story = {
  render: (args) => {
    return (
      <div className="">
        <Sidebar {...args} />
      </div>
    );
  },
  args: {
    isVerticalIcon: false,
    isMobileSidebar: true,
    pathname: '/admin/dashboard',
    sidebarLinks: [
      {
        icon: '/assets/sidebaricons/dashboard.svg',
        title: 'Home',
        path: '/admin/dashboard',
      },
      {
        icon: '/assets/sidebaricons/classroom.svg',
        title: 'Classrooms',
        path: '/admin/classrooms',
      },
      {
        icon: '/assets/sidebaricons/students.svg',
        title: 'Students',
        path: '/admin/students',
      },
      {
        icon: '/assets/sidebaricons/teachers.svg',
        title: 'Teachers',
        path: '/admin/teachers',
      },
      {
        icon: '/assets/sidebaricons/managements.svg',
        title: 'Management',
        path: '/admin/management',
      },
    ],
  },
};
