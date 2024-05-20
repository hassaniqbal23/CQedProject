import type { Meta, StoryObj } from '@storybook/react';
import ClassRoomHeader from './TeacherClassroomBanner';

const meta = {
  title: 'Ui/ClassRoomHeader',
  component: ClassRoomHeader,

  tags: ['autodocs'],
} satisfies Meta<typeof ClassRoomHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <>
        <ClassRoomHeader {...args} />
      </>
    );
  },
  args: {
    title: 'Welcome to Classrooms',
    description:
      'Your Virtual CQED where you can help and engage with students ',
  },
};
