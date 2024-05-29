import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
interface DashboardCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonOnClick: () => void;
  icon: { height: number; src: string; width: number };
  cardType: 'default' | 'primary' | 'secondary';
  className?: string;
}

export const StudentDashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  buttonText,
  buttonOnClick,
  icon,
  cardType = 'default',
  className,
}) => {
  let cardClasses = `max-w-full p-7 rounded-lg flex justify-between items-center gap-4 text-white ${className}`;

  if (cardType === 'primary') {
    cardClasses += ' bg-[#8E6CF7]';
  } else if (cardType === 'secondary') {
    cardClasses += ' bg-[#676BC6]';
  } else {
    cardClasses += ' bg-[#F08853]';
  }

  return (
    <div className={cardClasses}>
      <div>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-lg mb-6 max-w-sm font-normal">{description}</p>
        <Button
          className="px-8 py-2  bg-white rounded-3xl font-medium text-black text-lg"
          onClick={buttonOnClick}
        >
          {buttonText}
        </Button>
      </div>
      <div className="mt-6">
        <Image
          src={icon.src}
          alt={`student-${title}`}
          height={icon.height}
          width={icon.width}
        />
      </div>
    </div>
  );
};
