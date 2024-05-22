import type { Meta, StoryObj } from '@storybook/react';
import { SelectV2Creatable } from './select-v2';

const meta = {
  title: 'Forms/Select/SelectV2Creatable',
  component: SelectV2Creatable,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof SelectV2Creatable>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
];

export const Creatable: Story = {
  render(args) {
    return (
      <div>
        <SelectV2Creatable {...args} />
      </div>
    );
  },
  args: {
    options: options,
    placeholder: 'Select a Language',
    label: 'Select a Language',
    isClearable: true,
  },
};

export const CreatableWithMultiOption: Story = {
  render(args) {
    return (
      <div>
        <SelectV2Creatable {...args} />
      </div>
    );
  },
  args: {
    options: options,
    placeholder: 'Select Languages',
    label: 'Select Languages',
    isMulti: true,
  },
};
