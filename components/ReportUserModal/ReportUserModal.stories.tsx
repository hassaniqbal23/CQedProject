import type { Meta, StoryObj } from '@storybook/react';
import { ReportUserDialog } from './ReportUserModal';

const meta = {
  title: 'UI/ReportUserDialog',
  component: ReportUserDialog,

  tags: ['autodocs'],
} satisfies Meta<typeof ReportUserDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return (
      <div>
        <ReportUserDialog {...args} />
      </div>
    );
  },
  args: {
    Title: 'Report user',
    Description:
      'Are you sure you want to Report this user? This action cannot be undone.',
    ButtonTrigger: 'Report User?',
    ButtonAction: ' Report ',
    ButtonCancel: 'Canecl',
  },
};
