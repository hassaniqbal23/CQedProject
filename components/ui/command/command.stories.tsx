import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommandDemo } from './command';
import {
  CreditCard,
  User,
  Settings2,
  Calendar,
  Smile,
  Calculator,
} from 'lucide-react';

const meta = {
  title: 'Ui/Command',
  component: CommandDemo,

  tags: ['autodocs'],
} as Meta<typeof CommandDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <CommandDemo {...args} />
      </>
    );
  },
  args: {
    commandItems: [
      {
        icon: <Calendar className="mr-2 h-4 w-4" />,
        title: 'Calendar',
        shortcut: '⌘C',
      },
      {
        icon: <Smile className="mr-2 h-4 w-4" />,
        title: 'Search Emoji',
        shortcut: '⌘E',
      },
      {
        icon: <Calculator className="mr-2 h-4 w-4" />,
        title: 'Calculator',
        shortcut: '⌘L',
      },
    ],
  },
};

export const Settings: Story = {
  render: (args) => {
    return (
      <>
        <CommandDemo {...args} />
      </>
    );
  },
  args: {
    commandItems: [
      {
        icon: <User className="mr-2 h-4 w-4" />,
        title: 'Profile',
        shortcut: '⌘P',
      },
      {
        icon: <CreditCard className="mr-2 h-4 w-4" />,
        title: 'Billing',
        shortcut: '⌘B',
      },
      {
        icon: <Settings2 className="mr-2 h-4 w-4" />,
        title: 'Settings',
        shortcut: '⌘S',
      },
    ],
  },
};
