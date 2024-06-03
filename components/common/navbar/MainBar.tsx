'use client';

import { FC, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '@/components/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { IUserInformation } from '@/app/gobalContext/types';

interface IDropDownOption {
  title: string;
  path?: string;
  icon?: React.ComponentType | React.ReactNode;
  onClick?: () => void;
}
interface IHorizontalLinks {
  href: string;
  type: 'icon' | 'profile';
  icon?: React.ComponentType | React.ReactNode;
  dropdownOption?: IDropDownOption[];
}

const HorizontalLinks = ({ icon: Icon, href }: { icon: any; href: string }) => (
  <Link href={href} className="my-2 cursor-pointer">
    <div className="flex gap-4 items-center p-2 bg-[#F0F0F0] rounded-full">
      {Icon}
    </div>
  </Link>
);

const ProfileLink = ({
  userInformation,
  dropdownOption,
}: {
  userInformation: IUserInformation;
  dropdownOption: IDropDownOption[] | undefined;
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <Popover open={openDropDown}>
      <PopoverTrigger onClick={() => setOpenDropDown(!openDropDown)}>
        <div className="flex gap-2 items-center justify-center">
          <Avatar className="h-10 w-h-10">
            <AvatarImage
              src={userInformation?.attachment?.file_path}
              alt="Profile Picture"
            />
            <AvatarFallback>CQED</AvatarFallback>
          </Avatar>
          <div className="block text-left pr-10">
            <h1 className="font-semibold text-base  text-black">
              {userInformation?.name || ''}
            </h1>
            <p className="text-xs font-medium">{userInformation.name}</p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className=" w-[13.1rem] relative right-10 p-0 ">
        {dropdownOption?.length && (
          <>
            {dropdownOption.map((item: IDropDownOption, index: number) => {
              return (
                <div key={index}>
                  <div
                    className="px-5 py-2 pb-2 mt-1 flex items-center hover:bg-slate-50"
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.onClick) {
                        item.onClick();
                      }
                      setOpenDropDown(false);
                    }}
                  >
                    {item.icon as React.ReactNode}
                    <Link
                      href={item.path || ''}
                      className="text-sm w-min p-0 m-0 ml-2 capitalize whitespace-nowrap h-min font-semibold "
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="w-full flex justify-center">
                    <Separator className="w-4/5" />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

interface IProps {
  horizontalLinks?: IHorizontalLinks[];
}
export const Navbar: FC<IProps> = ({ horizontalLinks }) => {
  const { userInformation } = useGlobalState();
  return (
    <nav className="w-full fixed top-0 flex items-center justify-between bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-10">
      <Image
        src={'/assets/logos/navbarlogo.svg'}
        alt="navbar logo"
        width={30}
        height={30}
      />
      <div className="flex items-center justify-end">
        <div className="flex justify-around sm:justify-between gap-2 items-center py-2 pr-4">
          {horizontalLinks && horizontalLinks?.length > 0 ? (
            horizontalLinks.map((link: IHorizontalLinks, index: number) => {
              if (link.type === 'icon' && link.icon) {
                return (
                  <HorizontalLinks
                    href={link.href}
                    key={index}
                    icon={link.icon}
                  />
                );
              }
              if (link.type === 'profile') {
                return (
                  <ProfileLink
                    key={index}
                    userInformation={userInformation}
                    dropdownOption={link.dropdownOption}
                  />
                );
              }
              return null;
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
