import type { StoryObj } from '@storybook/react';
import { DialogDemo } from './dialog';

const meta = {
  title: 'Ui/Dialog',
  component: DialogDemo,

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <DialogDemo {...args} />
      </div>
    );
  },
  args: {
    ButtonTitle: 'Edit Profile',
    ContentTitle: 'Edit profile',
    ContentDescription:
      "  Make changes to your profile here. Click save when you're done.",
    DialogAction: 'Save Changes',
  },
};
