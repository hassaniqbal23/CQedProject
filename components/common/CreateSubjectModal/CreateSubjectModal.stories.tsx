import type { Meta, StoryObj } from '@storybook/react';
import { CreateSubjectModal } from './CreateSubjectModal';
import { Button } from '@/components/ui';
import React from 'react';

const meta = {
  title: 'UI/CreateSubjectModal',
  component: CreateSubjectModal,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof CreateSubjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    const [open, setOpen] = React.useState(false);

    return (
      <div>
        <CreateSubjectModal
          {...args}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
        />
      </div>
    );
  },
  args: {
    Title: 'Add your Subject',
    trigger: <Button>Show Modal</Button>,
    ButtonAction: 'Create Subject',
    ButtonCancel: 'Cancel',
    open: false,
    loading: false,
    onOpen: () => {},
    onClose: () => {},
  },
};
