import type { Meta, StoryObj } from '@storybook/react';
import { ReportUserDialog } from './ReportUserModal';
import { Button } from '@/components/ui';

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
    title: 'Report user',
    description:
      'Are you sure you want to report this user? This action cannot be undone.',
    buttonTrigger: <Button>Report</Button>,
    buttonOKLabel: ' Report ',
    buttonCancelLabel: 'Cancel',
  },
};
