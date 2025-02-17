import { Typography } from '@/components/common/Typography/Typography';
import { Button } from '@/components/ui';
import Image from 'next/image';
import React, { FC } from 'react';

interface IActionCard {
  title: string;
  description: string;
  buttonText: string;
  icon: string;
  onButtonClick?: () => void;
}

export const ActionCard: FC<IActionCard> = ({
  title,
  description,
  buttonText,
  icon,
  onButtonClick,
}) => {
  return (
    <div className="max-full bg-[#ECEDF8] rounded-xl overflow-hidden shadow-lg  p-6 py-8 text-center border border-gray-200">
      <Image
        className="w-12 h-12 mx-auto mb-4"
        src={icon}
        alt={`${title} icon`}
        width={82}
        height={82}
      />
      <Typography weight="semibold" variant="h4" className="m-1">
        {title}
      </Typography>
      <Typography weight="medium" variant="p" className="text-gray-700  mb-4">
        {description}
      </Typography>
      <Button
        onClick={onButtonClick}
        className="bg-white  text-[#000000] font-medium py-2 px-6 rounded-full"
      >
        {buttonText}
      </Button>
    </div>
  );
};
