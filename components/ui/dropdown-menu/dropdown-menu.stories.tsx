import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown-menu';
import { Button } from './../index';
import { Menu } from 'lucide-react';

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render(args) {
    return <Dropdown {...args} />;
  },
  args: {
    trigger: (
      <Button className="w-[130px] ">
        <Menu></Menu>
      </Button>
    ),
    options: [
      {
        content: 'Option 1',
      },
      {
        content: 'Option 2',
      },
      {
        content: 'Option 3',
      },
    ],
  },
};
