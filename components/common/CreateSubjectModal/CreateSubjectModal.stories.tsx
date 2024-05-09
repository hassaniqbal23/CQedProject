import type { Meta, StoryObj } from '@storybook/react';
import { CreateSubjectModal } from './CreateSubjectModal';
import { Button } from '@/components/ui';

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
    return (
      <div>
        <CreateSubjectModal {...args} />
      </div>
    );
  },
  args: {
    Title: 'Add your Subject',
    trigger: <Button>Show Modal</Button>,
    ButtonAction: 'Create Subject',
    ButtonCancel: 'Cancel',
  },
};
