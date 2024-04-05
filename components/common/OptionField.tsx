import { FC } from 'react';

interface IProps {
  className?: string;
  value?: string;
  title?: string;
}

export const OptionField: FC<IProps> = ({ className, value, title }) => {
  return (
    <option className={`${className} text-black`} value={value}>
      {title}
    </option>
  );
};
