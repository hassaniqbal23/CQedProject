import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './select';

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectLanguageSingle: Story = {
  render(args) {
    return (
      <div>
        <Select {...args} />
      </div>
    );
  },
  args: {},
};
