import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput } from './Select';
import Image from 'next/image';

const meta = {
  title: 'Forms/SelectWithImage',
  component: SelectInput,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectSingle: Story = {
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
        render() {
          return (
            <div>
              <Image
                height={30}
                width={30}
                src={'/countries/india.svg'}
                alt="flag"
              />
              <span className="ml-2">India</span>
            </div>
          );
        },
      },
      {
        label: 'Pakistan',
        value: 'pakistan',
        render() {
          return (
            <div>
              <Image
                height={30}
                width={30}
                src={'/countries/pakistan.svg'}
                alt="flag"
              />
              <span className="ml-2">Pakistan</span>
            </div>
          );
        },
      },
      {
        label: 'UK',
        value: 'uk',
        render() {
          return (
            <div>
              <Image
                height={30}
                width={30}
                src={'/countries/uk.svg'}
                alt="flag"
              />
              <span className="ml-2">UK</span>
            </div>
          );
        },
      },
    ],
  },
};
