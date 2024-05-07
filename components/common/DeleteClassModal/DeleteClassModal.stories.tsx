import type { Meta, StoryObj } from '@storybook/react';
import { DeleteClassDialog } from './DeleteClassModal';

const meta = {
  title: 'UI/DeleteClassDialog',
  component: DeleteClassDialog,

  tags: ['autodocs'],
} satisfies Meta<typeof DeleteClassDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return (
      <div>
        <DeleteClassDialog {...args} />
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
