import type { Meta, StoryObj } from '@storybook/react';
import { DeleteDialog } from './DeleteClassModal';

const meta = {
  title: 'Forms/DeleteDialog',
  component: DeleteDialog,

  tags: ['autodocs'],
} satisfies Meta<typeof DeleteDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return (
      <div>
        <DeleteDialog {...args} />
      </div>
    );
  },
  args: {
    Title: 'Delete your class',
    Description: 'Are you sure want to delete your class',
    ButtonTrigger: 'Delete',
    ButtonAction: 'Delete this Class',
    ButtonCancel: 'Cancel',
  },
};
