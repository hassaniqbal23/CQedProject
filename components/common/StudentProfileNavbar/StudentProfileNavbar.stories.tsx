import type { Meta, StoryObj } from '@storybook/react';
import StudentProfileNavbar from './StudentProfileNavbar';

const meta: Meta<typeof StudentProfileNavbar> = {
  title: 'UI/Student/StudentProfileNavbar',
  component: StudentProfileNavbar,
} satisfies Meta<typeof StudentProfileNavbar>;

export default meta;
type Story = StoryObj<typeof StudentProfileNavbar>;

export const primary: Story = {
  render: (args) => (
    <div>
      <StudentProfileNavbar {...args} />
    </div>
  ),
  args: {
    userImage: '/assets/profile/profile.svg',
    heading: 'Moin Haikal',
  },
};
