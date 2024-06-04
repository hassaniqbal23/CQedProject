import { Button } from '@/components/ui';
import { MapPin, MessageSquareText } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
interface HeaderProps {
  name?: string;
  role?: string;
  isVisible?: boolean;
  location?: string;
  profileIcon?: string;
  subrole?: string;
  titleClass?: string;

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
}) => {
  return (
    <div className="flex items-center  flex-wrap justify-between w-full bg-primary-500 rounded-2xl text-white p-3 md:p-6 shadow-md text-left md:text-left">
      <div className="flex items-center">
        <Avatar className="h-14 w-18">
          <AvatarImage src={profileIcon} alt="Profile Picture" />
        </Avatar>
        <div className="ml-6">
          {name && <h1 className={`font-bold mb-2 ${titleClass}`}>{name}</h1>}
          {role && (
            <p className="text-gray-400 text-sm">
              {role} <span className="text-white ml-1">{subrole}</span>
            </p>
          )}
          {location && (
            <div className="flex items-center mt-3 md:mt-5">
              <MapPin strokeWidth={'2px'} color="#FFD249" size={16} />
              <p className="text-lg ml-2 ">{location}</p>
            </div>
          )}
        </div>
      </div>
      {buttonProps?.isVisbile && (
        <div className="flex items-center ">
          <Button
            onClick={buttonProps?.onClick}
            icon={<MessageSquareText className="mr-1" height={16} width={16} />}
            iconPosition="left"
            className="px-12  items-center flex hover:bg-primary-100 hover:text-black-50"
            variant={'outline'}
            type="button"
            size={'sm'}
          >
            {buttonProps.buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

ProfileHeader.displayName = 'ProfileHeader';
