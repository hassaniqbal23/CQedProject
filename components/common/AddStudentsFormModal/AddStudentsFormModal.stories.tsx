import type { Meta, StoryObj } from '@storybook/react';
import { AddStudentModal } from './AddStudentsFormModal';

const meta = {
  title: 'UI/AddStudentModal',
  component: AddStudentModal,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof AddStudentModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectLanguageSingle: Story = {
  render(args) {
    return (
      <div>
        <AddStudentModal {...args} />
      </div>
    );
  },
  args: {
    Title: 'Add Student',
    ButtonTrigger: 'Add Student',
    DropDownTitle: 'Class Grade',
    ButtonAction: 'Add Student',
  },
};
