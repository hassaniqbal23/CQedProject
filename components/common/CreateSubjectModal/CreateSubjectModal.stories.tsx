import type { Meta, StoryObj } from '@storybook/react';
import { CreateSubjectDialog } from './CreateSubjectModal';

const meta = {
  title: 'Ui/CreateSubjectDialog',
  component: CreateSubjectDialog,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof CreateSubjectDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return (
      <div>
        <CreateSubjectDialog {...args} />
      </div>
    );
  },
  args: {
    Title: 'Add your Subject',
    ButtonTrigger: 'Add Subject',
    ButtonAction: 'Create Subject',
    ButtonCancel: 'Cancel',
  },
};
