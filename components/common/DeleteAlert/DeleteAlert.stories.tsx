import type { Meta, StoryObj } from '@storybook/react';

import Delete from './DeleteAlert';
import { Button } from '@/components/ui';
import Modal from '../Modal/Modal';
import { useState } from 'react';

const meta: Meta<typeof Delete> = {
  title: 'UI/Modal',
  component: Delete,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Delete>;

export default meta;
type Story = StoryObj<typeof Delete>;

export const DeleteAlert: Story = {
  render(args) {
    const [open, setOpen] = useState(false);
    const value = {
      ...args,
      isVisible: open,
      onClose: () => setOpen(false),
      onConfirm: () => setOpen(false),
    };
    return (
      <>
        <h3 onClick={() => setOpen(true)} className={'text-red-700'}>
          {' '}
          Open Delete Model{' '}
        </h3>
        <Delete {...value} />
      </>
    );
  },
  args: {
    isVisible: false,
    onClose: () => {
      console.log('close');
    },
    onConfirm() {
      console.log('confirm');
    },
  },
};
