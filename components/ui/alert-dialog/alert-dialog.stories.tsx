import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogDemo } from './alert-dialog';

const meta = {
  title: 'Ui/AlertDialog',
  component: AlertDialogDemo,

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <AlertDialogDemo {...args} />
      </div>
    );
  },
  args: {
    ButtonTitle: 'Show Dialog',
    DialogTitle: 'Are you absolutely sure?',
    DialogDescription:
      ' This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    DialogCancel: 'Cancel',
    DialogAction: 'Continue',
  },
};
