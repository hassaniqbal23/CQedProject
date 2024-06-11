import React from 'react';
import { Button } from '@/components/ui';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarImage } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import countriesData from '@/public/countries/countries.json';
import Link from 'next/link';

interface Countries {
  [key: string]: string;
}

const countries: Countries = countriesData;
interface HeaderProps {
  name?: string;
  role?: string;
  isVisible?: boolean;
  location?: string;
  profileIcon?: string;
  subrole?: string;
  titleClass?: string;
  age?: string;
  gender?: string;
  country?: string;
  mutualFriends?: string;
  profileId?: string;
  buttonProps?: {
    isVisbile?: boolean;
    onClick?: () => void;
    buttonText?: string;
  };
  imageSize?: {
    height?: number;
    width?: number;
  };
}

export const ProfileHeader: React.FC<HeaderProps> = ({
  name,
  role,
  location,
  profileIcon,
  subrole,
  imageSize,
  buttonProps,
  titleClass = 'text-xl',
  age,
  gender,
  country,
  mutualFriends,
  profileId,
}) => {
  return (
    <div className="flex items-center  flex-wrap justify-between w-full bg-primary-500 rounded-2xl text-white p-3 md:p-6 shadow-md text-left md:text-left">
      <div className="flex items-center">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profileIcon} alt="Profile Picture" />
        </Avatar>
        <div className="ml-6">
          {name && <h1 className={`font-bold mb-2 ${titleClass}`}>{name}</h1>}
          {role && (
            <p className="text-gray-400 text-sm">
              {role} <span className="text-white ml-1">{subrole}</span>
            </p>
          )}
          {(age || gender) && (
            <p className="text-white text-base mb-2">
              {age}, <span className=" ml-1">{gender}</span>
            </p>
          )}
          {location && (
            <div className="flex items-center mt-3 md:mt-5">
              <MapPin strokeWidth={'2px'} color="#FFD249" size={16} />
              <p className="text-lg ml-2 ">{location}</p>
            </div>
          )}
          {country && (
            <div className="flex items-center">
              <Image
                src={`/country-flags/svg/pk.svg`}
                alt="flag"
                className="rounded-md"
                width={38}
                height={38}
                unoptimized={true}
              />
              <Typography variant="h6" weight="medium" className="ml-2 text-xl">
                {countries['PK'] || 'Unknown Country'}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        {profileId && (
          <Typography
            variant="p"
            weight="semibold"
            className="mb-10 text-base pt-2 "
          >
            Profile Id: {profileId}
          </Typography>
        )}
        {buttonProps?.isVisbile && (
          <div>
            <Button
              onClick={buttonProps?.onClick}
              iconPosition="left"
              className={`rounded-full bg-[#ECEDF8] text-primary-500 w-36 h-10 text-base`}
              variant={'outline'}
              type="button"
              size={'sm'}
            >
              {buttonProps.buttonText}
            </Button>
            <Typography
              variant="p"
              weight="semibold"
              className="mb-1 text-xs pt-2"
            >
              <Link href="" className="">
                {mutualFriends}
              </Link>
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileHeader.displayName = 'ProfileHeader';
