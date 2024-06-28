import React, { useState } from 'react';

import countriesJSON from '../../../public/countries/countries.json';
import languages from '../../../public/countries/countriesLanguages.json';
import { SelectV2Virtualized } from './select-v2';
import type { SelectV2Props } from './select-v2';

const getFlag = (code: string) => {
  return require(`../../../public/country-flags/svg/${code.toLowerCase()}.svg`)
    .default.src;
};

export interface SelectCountryProps extends SelectV2Props { }
const SelectCountry = (props: SelectCountryProps) => {
  const [searchValue, setSearchValue] = useState('');

  const options = Object.keys(countriesJSON).map((c) => {
    return {
      value: c,
      label: countriesJSON[c as keyof typeof countriesJSON],
    };
  });

  return (
    <div>
      <SelectV2Virtualized
        styles={{
          control: (style) => ({
            ...style,
            background: '#f8f9fb',
            color: 'black',
            ':focus-within': {
              color: 'red',
            },
          }),
          singleValue: (styles, { data }) => ({
            ...styles,
            height: '25px',
            display: 'flex',
            alignItems: 'center',
          }),
          input: (styles) => ({
            color: 'black',
            background: '#f8f9fb',
          }),
          valueContainer: (style) => ({
            ...style,
            height: '49px',
            display: 'flex',
          }),
        }}
        onInputChange={(e) => {
          setSearchValue(e);
        }}
        inputValue={searchValue}
        value=""
        options={options}
        label="Select a Country"
        id=""
        inputId=""
        instanceId=""
        isClearable
        isDisabled={false}
        isLoading={false}
        isSearchable
        placeholder="Select a Country"
        isMulti={false}
        formatOptionLabel={(option: any) => (
          <div className="flex gap-2 items-center">
            <div>
              <img
                src={getFlag(option.value)}
                className="h-[30px] w-[30px]"
                alt={option.label}
              />
            </div>
            <div>{option.label}</div>
          </div>
        )}
        {...props}
      />
    </div>
  );
};

export interface SelectLanguageProps extends SelectV2Props {
  countryCode: string;
}
const SelectLanguage = (props: SelectLanguageProps) => {
  const [searchValue, setSearchValue] = useState('');
  const options = React.useMemo(() => {
    if (!props.countryCode) {
      return [];
    }
    return (
      languages
        .find(
          (c) => c.country.toLowerCase() === props.countryCode.toLowerCase()
        )
        ?.languages.map((l) => {
          return {
            value: l,
            label: l,
          };
        }) || []
    );
  }, [props.countryCode]);
  return (
    <div>
      <SelectV2Virtualized
        onChange={(e) => {
          console.log(e);
        }}
        onInputChange={(e) => {
          setSearchValue(e);
        }}
        inputValue={searchValue}
        options={options}
        label="Select a Language"
        isClearable
        isDisabled={false}
        isLoading={false}
        isSearchable
        placeholder="Select a Language"
        isMulti={false}
        {...props}
      />
    </div>
  );
};

export { SelectCountry, SelectLanguage };
