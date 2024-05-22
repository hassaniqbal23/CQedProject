import React, { FC, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/Typography/Typography';
interface IProps {
  userImage: string;
  userFullName: string;
  description: string;
  iconMenu: string;
  Profile: string;
  Settings: string;
}

export const ChatHeader: FC<IProps> = ({
  userImage,
  userFullName,
  description,
  iconMenu,
  Profile,
  Settings,
}: IProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between bg-[#F4F4F4] items-center px-10 py-2">
      <div className="flex gap-3">
        <div>
          <Avatar className="w-14 h-14 rounded-full bg-lightgray">
            <AvatarImage src={userImage} alt="Profile Picture" />
          </Avatar>
        </div>

        <div>
          <Typography
            variant="body"
            weight="medium"
            className="text-[#1E1F21] text-lg font-semibold"
          >
            {userFullName}
          </Typography>
          <Typography
            variant="body"
            weight="medium"
            className=" text-sm text-[#70C670]"
          >
            {description}
          </Typography>
        </div>
      </div>

      <div className="relative">
        <Button
          onClick={toggleDropdown}
          className="focus:outline-none bg-[#F4F4F4]"
        >
          <Image src={iconMenu} alt="Menu Icon" width={50} height={50} />
        </Button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {Profile}
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {Settings}
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
