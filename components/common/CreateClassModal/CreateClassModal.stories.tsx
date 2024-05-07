import type { Meta, StoryObj } from '@storybook/react';
import { CreateClassDialog } from './CreateClassModal';

const meta = {
  title: 'Forms/CreateClassDialog',
  component: CreateClassDialog,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof CreateClassDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return (
      <div>
        <CreateClassDialog {...args} />
      </div>
    );
  },
  args: {
    Title: 'Create your class',
    ButtonTrigger: 'Create your class',
    DropDownTitle: 'Class Grade',
    ButtonAction: 'Create Class',
    ButtonCancel: 'Cancel',
  },
};
