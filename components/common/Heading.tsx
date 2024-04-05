import { FC } from 'react';
interface IProps {
  className?: string;
  text?: string;
  fontSize?: string;
  fontWeight?: string;
  textColor?: string;
}

export const Heading: FC<IProps> = ({
  className,
  text,
  fontSize,
  fontWeight,
  textColor,
}) => {
  return (
    <h1
      className={`${className} ${fontWeight ? fontWeight : 'font-bold'} ${
        fontSize ? fontSize : 'text-3xl'
      } ${textColor}`}
    >
      {text}
    </h1>
  );
};
