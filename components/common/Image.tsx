import { FC } from 'react';
import MyImage from 'next/image';

interface IProps {
  className?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const Image: FC<IProps> = ({ className, src, alt, width, height }) => {
  return (
    <MyImage
      className={className}
      src={src ? src : ''}
      alt={alt ? alt : 'image'}
      unoptimized
      width={width}
      height={height}
    />
  );
};
