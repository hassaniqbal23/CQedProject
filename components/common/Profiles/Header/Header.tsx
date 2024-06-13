import React from 'react';
import { Button, Dropdown } from '@/components/ui';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarImage } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import countriesData from '@/public/countries/countries.json';
import { IoChevronDown, IoChatbubbleOutline } from 'react-icons/io5';
import { getCountry } from '@/app/utils/helpers';

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
  loggedInUser?: boolean;
  buttonProps?: {
    isVisbile?: boolean;
    onClick?: () => void;
    buttonText?: string;
    isFriend?: boolean;
    isLoading?: boolean;
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
  country = '',
  mutualFriends,
  profileId,
  loggedInUser,
}) => {
  const { flag = '', country: countryName = '' } = getCountry(country);
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
                src={flag}
                alt="flag"
                className="rounded-md"
                width={38}
                height={38}
                unoptimized={true}
              />
              <Typography variant="h6" weight="medium" className="ml-2 text-xl">
                {countryName}
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
          <>
            {buttonProps.isFriend ? (
              <div className="flex">
                <Button
                  onClick={() => {}}
                  icon={<IoChatbubbleOutline size={20} />}
                  iconPosition="left"
                  className={`rounded-full bg-[#ECEDF8] text-primary-500 h-10 text-base mr-2 hover: border border-white`}
                  variant={'outline'}
                  type="button"
                  size={'sm'}
                ></Button>
                <Dropdown
                  trigger={
                    <div>
                      <Button
                        onClick={() => {}}
                        iconPosition="right"
                        icon={<IoChevronDown />}
                        className={`rounded-full bg-[#ECEDF8] text-primary-500 w-36 h-10 text-base hover: border border-white`}
                        variant={'outline'}
                        type="button"
                        size={'sm'}
                      >
                        Friends
                      </Button>
                    </div>
                  }
                  options={[
                    {
                      content: (
                        <div className="text-xs" onClick={buttonProps.onClick}>
                          Unfriend
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div className="text-xs" onClick={() => {}}>
                          Block
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div
                          className="text-xs text-primary-600 font-semibold"
                          onClick={() => {}}
                        >
                          Report profile
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            ) : (
              <div>
                <Button
                  onClick={buttonProps?.onClick}
                  className={`rounded-full bg-[#ECEDF8] text-primary-500 w-36 h-10 text-base hover: border border-white`}
                  variant={'outline'}
                  type="button"
                  size={'sm'}
                  loading={buttonProps?.isLoading}
                >
                  {buttonProps.buttonText}
                </Button>
                {!loggedInUser && (
                  <Typography
                    variant="p"
                    weight="semibold"
                    className="mb-1 text-xs pt-2"
                  >
                    <Link href="" className="">
                      {mutualFriends}
                    </Link>
                  </Typography>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

ProfileHeader.displayName = 'ProfileHeader';
