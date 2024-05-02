import type { Meta, StoryObj } from '@storybook/react';

import { DashboardCard } from './dasboardCard'; // Import the Dashboard component

const meta = {
  title: 'Ui/DashboardCard',
  component: DashboardCard,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Teachers', // Provide a default value for title
    buttonTitle: 'Invite', // Provide a default value for buttonTitle
    onClick: () => console.log('Invite teachers clicked'), // Provide a mock function for onClick
    icons: [
      '/assets/welcome/grey_man1.svg', // Provide example icons
      '/assets/welcome/grey_woman_2.svg',
      '/assets/welcome/GreyHair.svg',
    ],
  },
};
