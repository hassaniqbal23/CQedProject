import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import { getCountry, truncateText } from '@/app/utils/helpers';
import { useRouter } from 'next/navigation';
import { PenpalShipButtonRequest } from '../PenpalShipButtonRequest/PenpalShipButtonRequest';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';

interface PenpalshipCardProps {
  title?: string;
  label?: string;
  imgPath: string;
  buttonText?: string;
  description?: string;
  buttonOnClick: () => void;
  buttonLoading?: boolean;
  countryFlag?: string;
  countryName?: string;
  studentAge: string | number;
  mutualFriends?: string | number;
  id?: string | number;
}

const PenpalshipCard: React.FC<PenpalshipCardProps> = ({
  title,
  imgPath,
  buttonText,
  description,
  buttonOnClick,
  mutualFriends,
  countryFlag,
  countryName = '',
  studentAge,
  buttonLoading,
  id,
}) => {
  const route = useRouter();
  const { module } = useModule();

  const truncatedDescription =
    (description && truncateText(description, 12)) || '';
  const { flag = '', country = '' } = getCountry(countryName);

  const handleClick = () => {
    route.push(`/${module}/profile/${id}`);
  };
  return (
    <Card className="flex flex-col h-full">
      <div className="flex flex-col flex-grow p-2 rounded-sm">
        <div className="flex p-2 justify-between mt-2">
          <Image
            src={imgPath || '/assets/profile/profile.svg'}
            alt=""
            className="rounded-xl"
            width={70}
            height={70}
            unoptimized={true}
          />
          <PenpalShipButtonRequest user_id={id}></PenpalShipButtonRequest>
        </div>
        <div className="ml-2">
          <Typography
            variant="body"
            weight="bold"
            className="text-black break-words break-all text-lg font-semibold mt-2"
          >
            <span
              className="cursor-pointer hover:text-gray-700"
              onClick={handleClick}
            >
              {title}
            </span>
          </Typography>
          <Typography variant="p" weight="semibold" className="mb-1 text-xs">
            <Link href="" className="text-primary-500">
              {mutualFriends}
            </Link>
          </Typography>
          <Typography
            variant="body"
            weight="medium"
            className="text-[#131517] mt-1 leading-relaxed"
          >
            {truncatedDescription}
          </Typography>
        </div>
        <div className="mt-auto">
          <div className="block sm:flex justify-between p-2 items-center">
            <div className="flex items-center">
              <Image
                src={flag}
                alt="flag"
                className="shadow rounded"
                width={38}
                height={38}
                unoptimized={true}
              />
              <Typography variant="h6" weight="medium" className="ml-2 text-sm">
                {country}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h6"
                weight="medium"
                className="flex text-sm mt-2 sm:mt-0"
              >
                {studentAge} years old
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export { PenpalshipCard };
