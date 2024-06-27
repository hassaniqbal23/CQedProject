'use client';

import { FC, useEffect, useRef, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  SheetDemo,
} from '@/components/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import Link from 'next/link';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { IUserInformation } from '@/app/globalContext/types';
import { ISidebar } from '../sidebar/types';
import SidebarMobile from '../sidebar/SidebarMobile/SidebarMobile';
import { useResponsive } from '@/lib/hooks';
import { AlignJustify } from 'lucide-react';

interface IDropDownOption {
  title: string;
  path?: string;
  icon?: React.ComponentType | React.ReactNode;
  onClick?: () => void;
}
interface IHorizontalLinks {
  href?: string;
  type: 'icon' | 'profile';
  icon?: React.ComponentType | React.ReactNode;
  dropdownOption?: IDropDownOption[];
}

const HorizontalLinks = ({ icon: Icon, href }: { icon: any; href: string }) => {
  return (
    <>
      {href === 'notification' ? (
        <div className="my-2 cursor-pointer">
          <div className="flex gap-4 items-center p-2 bg-[#F0F0F0] rounded-full">
            {Icon}
          </div>
        </div>
      ) : (
        <Link href={href} className="my-2 cursor-pointer">
          <div className="flex gap-4 items-center p-2 bg-[#F0F0F0] rounded-full">
            {Icon}
          </div>
        </Link>
      )}
    </>
  );
};

const ProfileLink = ({
  userInformation,
  dropdownOption,
}: {
  userInformation: IUserInformation;
  dropdownOption: IDropDownOption[] | undefined;
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpenDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <PopoverContent ref={ref} className=" w-[13.1rem] relative right-10 p-0 ">
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
  sidebarLinks: ISidebar[];
  pathname: string;
  isVerticalIcon: boolean;
}
export const Navbar: FC<IProps> = ({
  horizontalLinks,
  isVerticalIcon,
  pathname,
  sidebarLinks,
}) => {
  const { userInformation } = useGlobalState();
  const { isMobile, isTabletMini } = useResponsive();
  return (
    <nav className="w-full fixed top-0 flex items-center justify-between bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-10 pl-2">
      {isMobile && !isTabletMini ? (
        <SheetDemo
          side="left"
          className="bg-primary-500 dark:bg-primary-700 h-full w-[300px] "
          trigger={
            <div className="ml-3">
              <AlignJustify size={30} className="cursor-pointer" />
            </div>
          }
        >
          <SidebarMobile
            className="w-[300px] z-0"
            isVerticalIcon={isVerticalIcon}
            pathname={pathname}
            sidebarLinks={sidebarLinks}
          />
        </SheetDemo>
      ) : (
        <div className="ml-3">
          <AlignJustify size={30} />
        </div>
      )}
      <div className="flex items-center justify-end">
        <div className="flex justify-around sm:justify-between gap-2 items-center py-2 pr-4">
          {horizontalLinks && horizontalLinks?.length > 0 ? (
            horizontalLinks.map((link: IHorizontalLinks, index: number) => {
              if (link.type === 'icon' && link.icon) {
                return (
                  <HorizontalLinks
                    href={link.href || ''}
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
