import { FC, FunctionComponent } from 'react';
import { Button, Card, Skeleton } from '@/components/ui';
import Image from 'next/image';

interface DashboardCardProps {
  title: string;
  buttonTitle: string;
  onClick: () => void;
  icons: Array<string>;
}

export const DashboardCard: FunctionComponent<DashboardCardProps> = ({
  title,
  buttonTitle,
  onClick,
  icons,
}) => {
  return (
    <Card>
      <div className="bg-white rounded-lg p-8">
        <div className="flex items-center mb-10">
          <Image
            src={'/assets/welcome/grey_man1.svg'}
            height={30}
            width={30}
            alt="icons"
          />
          <div className="text-xl ml-3 font-extrabold text-gray-800">
            Add {title}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {icons?.map((item: string, index: number) => (
            <div key={index} className="flex items-center mb-5">
              <Image src={item} height={60} width={60} alt="icons" />
              <Skeleton className="h-5 bg-gray-100 rounded ml-4 w-1/4 " />
            </div>
          ))}
        </div>
        <div className="">
          <p className="mb-4 text-gray-600 flex justify-center ">
            Invite your {title} to CQED
          </p>
          <div className="flex justify-center">
            <Button variant={'outline'} size={'sm'} onClick={onClick}>
              {buttonTitle}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
