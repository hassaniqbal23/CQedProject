'use client';

import { FC } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from './../../ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { MdLogout } from 'react-icons/md';
import { Bell, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { IUserInformation } from '@/app/gobalContext/types';

interface Link {
  src: string;
  type: 'icon' | 'profile';
  icon?: React.ComponentType;
}

const navPopLinks: Link[] = [
  { src: 'chat', type: 'icon', icon: MessageCircle },
  {
    src: 'notification',
    type: 'icon',
    icon: Bell,
  },
  {
    src: '',
    type: 'profile',
  },
];

const IconLink = ({ icon: Icon }: { icon: any }) => (
  <div className="my-2 cursor-pointer">
    <div className="flex gap-4 items-center p-2 bg-[#F0F0F0] rounded-full">
      <Icon className="text-black border text-2xl" />
    </div>
  </div>
);

const ProfileLink = ({
  onClick,
  userInformation,
}: {
  onClick: () => void;
  userInformation: IUserInformation;
}) => (
  <Popover>
    <PopoverTrigger>
      <div className="flex gap-2 items-center justify-center">
        <Avatar className="h-10 w-h-10">
          <AvatarImage
            src="/assets/profile/profile.svg"
            alt="Profile Picture"
          />
          <AvatarFallback>CQED</AvatarFallback>
        </Avatar>
        <div className="block text-left ">
          <h1 className="font-semibold text-base  text-black">
            {userInformation?.name || ''}
          </h1>
          <p className="text-xs font-medium">{userInformation.name}</p>
        </div>
      </div>
    </PopoverTrigger>
    <PopoverContent className="mt-1 w-[13.1rem] relative right-10 p-0">
      <div className="px-5 py-4 flex">
        <MdLogout className="text-base rotate-180 text-primary mr-3" />
        <Button
          variant="ghost"
          onClick={onClick}
          className="text-sm w-min p-0 m-0 capitalize whitespace-nowrap h-min font-normal hover:bg-transparent"
        >
          log out
        </Button>
      </div>
    </PopoverContent>
  </Popover>
);

interface IProps {
  onLogout: () => void;
}
export const Navbar: FC<IProps> = ({ onLogout }) => {
  const { userInformation } = useGlobalState();
  return (
    <nav className="w-full fixed top-0 flex items-center justify-between bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <Image
        src={'/assets/logos/navbarlogo.svg'}
        alt="navbar logo"
        width={30}
        height={30}
      />
      <div className="flex items-center justify-end">
        <div className="flex justify-around sm:justify-between gap-2 items-center py-2 pr-4">
          {navPopLinks.map((link, index) => {
            if (link.type === 'icon' && link.icon) {
              return <IconLink key={index} icon={link.icon} />;
            }
            if (link.type === 'profile') {
              return (
                <ProfileLink
                  key={index}
                  onClick={onLogout}
                  userInformation={userInformation}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
