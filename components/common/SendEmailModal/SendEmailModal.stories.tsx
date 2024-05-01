import type { Meta, StoryObj } from '@storybook/react';
import { SendEmail } from './SendEmailModal';

const meta = {
  title: 'UI/Modal',
  component: SendEmail,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof SendEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InviteSchoolModal: Story = {
  render: (args) => {
    return (
      <div>
        <SendEmail {...args}></SendEmail>
      </div>
    );
  },
  args: {
    onSubmit: (data) => console.log(data),
  },
};
