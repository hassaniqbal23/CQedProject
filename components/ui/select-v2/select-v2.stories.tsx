import type { Meta, StoryObj } from '@storybook/react';
import { SelectV2 } from './select-v2';
import Flag from './../../../public/countries/india.svg';

const meta = {
  title: 'Forms/Select/SelectV2',
  component: SelectV2,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof SelectV2>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
];

export const SelectLanguage: Story = {
  render(args) {
    return (
      <div>
        <SelectV2 {...args} />
      </div>
    );
  },
  args: {
    label: 'Select a Language',
    options: options,
    id: '',
    inputValue: '',
    inputId: '',
    instanceId: '',
    isClearable: false,
    isDisabled: false,
    isLoading: false,
    placeholder: 'Select a Language',
    isMulti: true,
  },
};

export const SelectWithCustomOptionComponent: Story = {
  render(args) {
    return (
      <div>
        <SelectV2 {...args} />
      </div>
    );
  },
  args: {
    label: 'Select a Language',
    options: options,
    id: '',
    inputValue: '',
    inputId: '',
    instanceId: '',
    isClearable: false,
    isDisabled: false,
    isLoading: false,
    placeholder: 'Select a Language',
    isMulti: true,
    formatOptionLabel: (option: any) => (
      <div className="flex gap-2">
        <div>
          <img src={Flag.src} alt={option.label} />
        </div>
        <div>{option.label}</div>
      </div>
    ),
  },
};
