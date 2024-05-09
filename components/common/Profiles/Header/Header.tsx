import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface HeaderProps {
  name: string;
  role: string;
  location: string;
  profileIcon: string;
  subrole: string;
}

export const ProfileHeader: React.FC<HeaderProps> = ({
  name,
  role,
  location,
  profileIcon,
  subrole,
}) => {
  return (
    <div className="flex items-center bg-primary-500 rounded-2xl text-white p-3 md:p-6 shadow-md text-left md:text-left">
      <Image src={profileIcon} alt="profile-image" width={135} height={135} />
      <div className="ml-6">
        <h1 className="text-xl font-bold mb-2">{name}</h1>
        <p className="text-gray-400 text-sm">
          {role} <span className="text-white ml-1">{subrole}</span>
        </p>
        <div className="flex items-center mt-3 md:mt-5">
          <MapPin strokeWidth={'2px'} color="#FFD249" size={16} />
          <p className="text-lg ml-2 ">{location}</p>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.displayName = 'ProfileHeader';
