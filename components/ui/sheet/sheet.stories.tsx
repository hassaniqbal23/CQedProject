import type { Meta, StoryObj } from '@storybook/react';
import { SheetDemo } from './sheet';

const meta = {
  title: 'Ui/Sheet',
  component: SheetDemo,

  tags: ['autodocs'],
} as Meta<typeof SheetDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleDescription: Story = {
  render: (args) => {
    return (
      <>
        <SheetDemo {...args} />
      </>
    );
  },
  args: {
    title: 'Create new post',
    buttonTitle: 'Click',
    description: 'Fill out the form to create a new post.',
  },
};
