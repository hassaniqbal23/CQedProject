import type { Meta, StoryObj } from '@storybook/react';
import CreateClassRoom from './TeacherCreateClassRoom';

const meta = {
  title: 'Ui/CreateClassRoom',
  component: CreateClassRoom,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof CreateClassRoom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <>
        <CreateClassRoom {...args} />
      </>
    );
  },
  args: {
    title: 'Create your CQED Classroom',
  },
};
