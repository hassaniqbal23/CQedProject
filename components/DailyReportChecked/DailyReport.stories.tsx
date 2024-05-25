import type { Meta, StoryObj } from '@storybook/react';
import { DailyReportCheckIn } from './DailyReport';

const meta: Meta<typeof DailyReportCheckIn> = {
  title: 'DailyReportCheckIn',
  component: DailyReportCheckIn,
};

export default meta;

type Story = StoryObj<typeof DailyReportCheckIn>;

export const DailyReport: Story = {
  render: (args) => {
    return <DailyReportCheckIn {...args} />;
  },
  args: {
    name: 'in class 9 by sunail Ahmed',
  },
};
