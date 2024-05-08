import type { Meta, StoryObj } from '@storybook/react';
import MultiSelect from './MultiSelect';
import Image from 'next/image';

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
    // value: [{ value: '', label: '' }],
    placeholder: 'Select language',
    options: [
      {
        label: 'India',
        value: 'india',
        disable: false,
        render: () => {
          return (
            <div className='flex gap-1 items-center' >
              <Image height={30} width={30} src={'/countries/india.svg'} alt="flag" />
              <span className="ml-2">India</span>
            </div>
          )
        }
      },
      {
        label: 'Pakistan',
        value: 'pakistan',
        disable: false,
        render: () => {
          return (
            <div className='flex gap-1 items-center' >
              <Image height={30} width={30} src={'/countries/pakistan.svg'} alt="flag" />
              <span className="ml-2">Pakistan</span>
            </div>
          )
        }
      },
      {
        label: 'UK',
        value: 'uk',
        disable: false,
        render: () => {
          return (
            <div className='flex gap-1 items-center'>
              <Image height={30} width={30} src={'/countries/uk.svg'} alt="flag" />
              <span className="ml-2">UK</span>
            </div>
          )
        }
      },
    ],
    emptyIndicator: <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
      no results found.
    </p>,
  },
};
