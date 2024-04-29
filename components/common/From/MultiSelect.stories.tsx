import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';

const meta = {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiSelectComponent: Story = {
  render: (args) => {
    return <MultiSelect {...args} />;
  },
  args: {
    value: [{ value: '', label: '' }],
    onChange: (value: any) => {
      console.log(value, 'geting value');
    },
    placeholder: 'Select language',
    options: [
      {
        label: 'India',
        value: 'india',
      },
      {
        label: 'Pakistan',
        value: 'pakistan',
      },
      {
        label: 'UK',
        value: 'uk',
      },
    ],
  },
};
