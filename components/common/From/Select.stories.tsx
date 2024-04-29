import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput } from './Select';

const meta = {
  title: 'Forms/SelectWithImage',
  component: SelectInput,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return <SelectInput {...args} />;
  },
  args: {
    value: 'india',
    onChange: (value: string) => {
      console.log(value, 'geting value');
    },
    placeholder: 'Select language',
    options: [
      {
        label: 'India',
        value: 'india',
        flag: '/countries/india.svg',
      },
      {
        label: 'Pakistan',
        value: 'pakistan',
        flag: '/countries/pakistan.svg',
      },
      {
        label: 'UK',
        value: 'uk',
        flag: '/countries/uk.svg',
      },
    ],
  },
};
