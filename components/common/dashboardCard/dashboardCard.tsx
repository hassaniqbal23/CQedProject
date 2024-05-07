import React from 'react';
import Image from 'next/image';
interface DashboardCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonOnClick: () => void;
  icon: string;
  cardType: 'default' | 'primary' | 'secondary';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  buttonText,
  buttonOnClick,
  icon,
  cardType = 'default',
}) => {
  let cardClasses =
    'max-w-full p-7 rounded-lg flex justify-between items-center gap-4 text-white';

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
        <button
          className="px-8 py-2  bg-white rounded-3xl font-medium text-black text-lg"
          onClick={buttonOnClick}
        >
          {buttonText}
        </button>
      </div>
      <div className="mt-6">
        <Image src={icon} alt="" />
      </div>
    </div>
  );
};

export default DashboardCard;
