'use client';
import { FC } from 'react';

interface IProps {
  className?: string;
  onClick?: () => void;
  contant?: React.ReactNode;
}

export const Span: FC<IProps> = ({ className, onClick, contant }) => {
  return (
    <span
      className={`${className} text-sm font-normal text-[#0F172A] leading-6`}
      onClick={onClick}
    >
      {contant}
    </span>
  );
};
