declare module 'react-select-virtualized' {
  import { ComponentType } from 'react';
  import { Props as SelectProps } from 'react-select';

  export interface VirtualizedSelectProps extends SelectProps<any> {
    // Add any additional props specific to the virtualized select if needed
  }

  const SelectVirtualized: ComponentType<VirtualizedSelectProps>;
  export default SelectVirtualized;
}
