import { FC } from 'react';
import { format } from 'date-fns';
import { DashboardCard } from './dasboardCard';

interface IProps {
  handleInviteClick: () => void;
  title: string;
  buttonTitle: string;
  icons: Array<string>;
}
export const DashboardWelcome: FC<IProps> = ({
  handleInviteClick,
  title,
  buttonTitle,
  icons,
}) => {
  const currentDate = format(new Date(), 'EEEE, MMMM do');

  return (
    <div className="container w-10/12 p-4">
      <div className="mb-9 ">
        <div className="text-gray-600 text-sm flex justify-center mb-2">
          {currentDate}
        </div>
        <h1 className="text-3xl font-bold flex justify-center">
          Welcome to your Dashboard
        </h1>
      </div>
      <DashboardCard
        icons={icons}
        title={title}
        buttonTitle={buttonTitle}
        onClick={handleInviteClick}
      />
    </div>
  );
};
