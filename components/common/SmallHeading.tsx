import { FC } from 'react';

interface IProps {
  className?: string;
  text?: string;
  onclick?: () => void;
}

export const SmallHeading: FC<IProps> = ({ className, text, onclick }) => {
  return (
    <h1 className={`${className} font-medium text-sm`} onClick={onclick}>
      {text}
    </h1>
  );
};
