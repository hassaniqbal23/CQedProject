import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';

interface PenpalshipCardProps {
  title?: string;
  label?: string;
  imgPath: string;
  buttonText?: string;
  description?: string;
  buttonOnClick: () => void;
  buttonLoading?: boolean;
  countryFlag: string;
  countryName: string;
  studentAge: string | number;
  mutualFriends?: string | number;
}

const PenpalshipCard: React.FC<PenpalshipCardProps> = ({
  title,
  imgPath,
  buttonText,
  description,
  buttonOnClick,
  mutualFriends,
  countryFlag,
  countryName,
  studentAge,
  buttonLoading,
}) => {
  return (
    <Card>
      <div className="w-full flex flex-col p-2 rounded-sm ">
        <div>
          <div className="flex p-2 justify-between">
            <Image
              src={imgPath || '/assets/profile/profile.svg'}
              alt=""
              className="rounded-xl mt-2"
              width={70}
              height={70}
            />
            <Button
              onClick={buttonOnClick}
              className="rounded-full bg-[#ECEDF8] text-primary-500 w-32 h-12 "
              loading={buttonLoading}
            >
              {buttonText}
            </Button>
          </div>
          <div className="ml-2">
            <Typography
              variant={'body'}
              weight={'bold'}
              className="text-black text-lg font-semibold mt-2"
            >
              {title}
            </Typography>
            <Typography
              variant={'p'}
              weight={'semibold'}
              className="mb-1 mt-1 "
            >
              <Link href={''} className="text-primary-500 ">
                {mutualFriends}
              </Link>
            </Typography>

            <Typography
              variant={'body'}
              weight={'regular'}
              className='className=" text-[#131517]   mt-1 leading-relaxed'
            >
              {description}
            </Typography>

            <Typography
              variant={'body'}
              weight={'regular'}
              className="text-primary-500 font-semibold mt-1 mb-1"
            ></Typography>
          </div>
          <div className="flex justify-between p-2 items-center">
            <div className="flex">
              <Image
                src={countryFlag}
                alt="flag"
                className=" "
                width={38}
                height={38}
              />
              <Typography variant={'h5'} weight={'regular'} className="ml-2">
                {countryName}
              </Typography>
            </div>
            <div>
              <Typography variant={'h5'} weight={'regular'} className="flex ">
                {studentAge}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export { PenpalshipCard };
