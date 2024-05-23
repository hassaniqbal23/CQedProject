import React from 'react';
import Image from 'next/image';
import { Typography } from '@/components/common/Typography/Typography';
export interface ClassesCardProps {
  name: string;
  subject: string;
  imageUrl: string;
  variant?: 'default' | 'primary' | 'secondary';
}

const variantStyles = {
  default: 'bg-[#FFF1C7]',
  primary: 'bg-[#D0E6EB]',
  secondary: 'bg-[#ECEDF8]',
};
export const ClassesCard: React.FC<ClassesCardProps> = ({
  name,
  subject,
  imageUrl,
  variant = 'default',
}) => {
  return (
    <div
      className={`flex items-center rounded-lg p-6 ${variantStyles[variant]}`}
    >
      <div className="flex items-center gap-4 md:gap-7 lg:gap-16">
        <div className="flex flex-col gap-2">
          <Image src={imageUrl} alt="teacher-icon" width={65} height={65} />
          <Typography
            variant="p"
            weight="bold"
            className="max-w-20 text-[#394245]"
          >
            {name}
          </Typography>
        </div>
        <div>
          <h2 className=" text-[#394245] lg:text-3xl  font-bold  md:text-2xl text-[20px]">
            {subject}
          </h2>
        </div>
      </div>
    </div>
  );
};
