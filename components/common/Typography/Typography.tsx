import React from 'react';

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'p';
  weight: 'bold' | 'semibold' | 'medium' | 'regular';
  children?: React.ReactNode;
  className?: string;
};

const typographyStyles = {
  h1: {
    bold: 'text-4xl font-bold',
    semibold: 'text-4xl font-semibold',
    medium: 'text-4xl font-medium',
    regular: 'text-4xl font-normal',
  },
  h2: {
    bold: 'text-[31px] font-bold',
    semibold: 'text-[31px] font-semibold',
    medium: 'text-[31px] font-medium',
    regular: 'text-[31px] font-normal',
  },
  h3: {
    bold: 'text-[25px] font-bold',
    semibold: 'text-[25px] font-semibold',
    medium: 'text-[25px] font-medium',
    regular: 'text-[25px] font-normal',
  },
  h4: {
    bold: 'text-xl font-bold',
    semibold: 'text-xl font-semibold',
    medium: 'text-xl font-medium',
    regular: 'text-xl font-normal',
  },
  h5: {
    bold: 'text-lg font-bold',
    semibold: 'text-lg font-semibold',
    medium: 'text-lg font-medium',
    regular: 'text-lg font-normal',
  },
  h6: {
    bold: 'text-base font-bold',
    semibold: 'text-base font-semibold',
    medium: 'text-base font-medium',
    regular: 'text-base font-normal',
  },
  body: {
    bold: 'text-base font-bold',
    semibold: 'text-base font-semibold',
    medium: 'text-base font-medium',
    regular: 'text-base font-normal',
  },
  p: {
    bold: 'text-sm font-bold',
    semibold: 'text-sm font-semibold',
    medium: 'text-sm font-medium',
    regular: 'text-sm font-normal',
  },
};

export const Typography: React.FC<TypographyProps> = ({
  variant,
  weight,
  children,
  className = '',
}) => {
  let Component: any = 'div';
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      Component = variant;
      break;
    case 'body':
    case 'p':
      Component = 'p';
      break;
    default:
      Component = 'div';
  }

  const style = `${typographyStyles[variant][weight]} ${className}`;
  return <Component className={style}>{children}</Component>;
};

Typography.displayName = 'Typography';
