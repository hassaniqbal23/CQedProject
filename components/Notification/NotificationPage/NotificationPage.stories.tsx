import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationPage } from './NotificationPage';
const meta: Meta<typeof NotificationPage> = {
  title: 'Pages/NotificationPage',
  component: NotificationPage,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NotificationPage>;

export const Defalt: Story = {
  render: (args) => <NotificationPage {...args} />,
  args: {
    title: 'Notifications',
    subTitle: 'The total number of Students',
    buttonText: 'Mark all as read',
    buttonOnClick: () => {},
  },
};
