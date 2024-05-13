import React, { useState } from 'react';

import Select from 'react-select';
import Creatable from 'react-select/creatable';

import type { Props as ReactSelectProps } from 'react-select';

interface SelectV2Props extends ReactSelectProps {
  label?: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
}

const SelectV2 = (props: SelectV2Props) => {
  return (
    <div>
      {props.label ? (
        <label
          className={`block mb-1 ${props.labelProps?.className || ''}`}
          {...props.labelProps}
        >
          {props.label}
        </label>
      ) : (
        <></>
      )}
      <Select {...props} />
    </div>
  );
};

const SelectV2Creatable = (props: SelectV2Props) => {
  return (
    <div>
      {props.label ? (
        <label
          className={`block mb-1 ${props.labelProps?.className || ''}`}
          {...props.labelProps}
        >
          {props.label}
        </label>
      ) : (
        <></>
      )}
      <Creatable {...props} />
    </div>
  );
};

export { SelectV2, SelectV2Creatable };
