import type { Meta, StoryObj } from '@storybook/react';
import { SelectV2 } from './select-v2';
import Flag from './../../../public/countries/india.svg';
import languages from '../../../public/countries/countriesLanguages.json';
import React from 'react';
import { SelectCountry, SelectLanguage } from './select-v2-components';
const meta = {
  title: 'Forms/Select/SelectV2',
  component: SelectV2,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof SelectV2>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = languages
  .find((c) => c.country == 'PK')
  ?.languages.map((l) => {
    return {
      value: l,
      label: l,
    };
  });

export const SelectLanguageDemo: Story = {
  render(args) {
    return (
      <div>
        <SelectLanguage countryCode="PK"></SelectLanguage>
      </div>
    );
  },
  args: {},
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
    isSearchable: true,
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

export const SelectCountryDemo: Story = {
  render(args) {
    return <SelectCountry></SelectCountry>;
  },
  args: {},
};
