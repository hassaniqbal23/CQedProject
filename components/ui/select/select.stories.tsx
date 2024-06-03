import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput } from './select';

const meta = {
  title: 'Forms/SelectInput',
  component: SelectInput,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectLanguageSingle: Story = {
  render(args) {
    return (
      <div>
        <SelectInput {...args} />
      </div>
    );
  },
  args: {
    defaultValue: 'apple',
    loading: false,
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Mango', value: 'mango' },
    ],
    SelectTriggerClass: 'w-6/12',
    onSelect: (value) => {
      console.log(value, 'checking');
    },
    placeholder: 'Please Select the Fruit',
  },
};
