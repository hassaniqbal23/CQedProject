import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown-menu';

const meta = {
  title: 'Forms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectLanguageSingle: Story = {
  render(args) {
    return (
      <div>
        <Dropdown {...args} />
      </div>
    );
  },
  args: {
    value: [
      {
        label: 'UK',
        value: 'uk',
        altName: 'flag uk',
        flagUrl: '/countries/uk.svg',
      },
    ],
    onChange: (value: any) => {
      console.log(value, 'getting value ');
    },
    options: [
      {
        label: 'India',
        value: 'india',
        flagUrl: '/countries/india.svg',
        altName: 'flag india',
      },
      {
        label: 'Pakistan',
        value: 'pakistan',
        flagUrl: '/countries/pakistan.svg',
        altName: 'flag pakistan ',
      },
      {
        label: 'UK',
        value: 'uk',
        flagUrl: '/countries/uk.svg',
        altName: 'flag uk',
      },
    ],
  },
};

export const SelectLanguageMultipe: Story = {
  render(args) {
    return (
      <div>
        <Dropdown {...args} />
      </div>
    );
  },
  args: {
    multSelect: true,
    value: [
      {
        label: 'UK',
        value: 'uk',
        altName: 'flag uk',
        flagUrl: '/countries/uk.svg',
      },
    ],
    onChange: (value: any) => {
      console.log(value, 'getting value ');
    },
    options: [
      {
        label: 'India',
        value: 'india',
        flagUrl: '/countries/india.svg',
        altName: 'flag india',
      },
      {
        label: 'Pakistan',
        value: 'pakistan',
        flagUrl: '/countries/pakistan.svg',
        altName: 'flag pakistan ',
      },
      {
        label: 'UK',
        value: 'uk',
        flagUrl: '/countries/uk.svg',
        altName: 'flag uk',
      },
    ],
  },
};
