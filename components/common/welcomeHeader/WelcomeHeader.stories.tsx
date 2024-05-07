import type { Meta, StoryObj } from '@storybook/react';
import WelcomeHeader from './WelcomeHeader';

const meta = {
  title: 'Ui/WelcomeHeader',
  component: WelcomeHeader,

  tags: ['autodocs'],
} satisfies Meta<typeof WelcomeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <>
        <WelcomeHeader {...args} />
      </>
    );
  },
  args: {
    title: 'Welcome Moin!',
    description: 'Ready to create a culturally intelligent class',
  },
};
