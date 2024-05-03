import React from 'react';
import { IconType } from 'react-icons';

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
    'w-full bg-[#F08853] p-7 rounded-lg flex justify-between items-center gap-4';
  if (cardType === 'primary') {
    cardClasses += ' bg-[#8E6CF7] ';
  } else if (cardType === 'secondary') {
    cardClasses += ' bg-[#676BC6]';
  }

  return (
    <div className={cardClasses}>
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
        <p className="text-lg text-white  mb-6 max-w-sm font-normal">
          {description}
        </p>
        <button
          className="text-black flex px-8 py-3 justify-center items-center gap-10 bg-white rounded-3xl font-medium"
          onClick={buttonOnClick}
        >
          {buttonText}
        </button>
      </div>
      <div className="mt-6">
        <img src={icon} alt="" width={100} height={100} />
      </div>
    </div>
  );
};

export default DashboardCard;
