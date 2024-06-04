import Link from 'next/link';
import { Image } from '../Image';
import React, { FC } from 'react';
import { ISidebar } from './types';

interface IProps {
  sidebarLinks: ISidebar;
  pathname: string;
}

const SidebarMobileItem: FC<IProps> = ({ sidebarLinks, pathname }) => {
  return (
    <li
      className={`flex justify-center py-5 px-5 hover:bg-primary-600 ${pathname === sidebarLinks?.path ? 'bg-primary-600 ' : ''} `}
    >
      <Link
        href={sidebarLinks.path}
        className={` text-white  rounded-md group`}
      >
        {' '}
        <div className="flex justify-center items-center">
          <Image
            src={sidebarLinks.icon}
            width={40}
            height={40}
            alt={`displayed ${sidebarLinks.title}`}
            unoptimized={true}
          />
        </div>
      </Link>
    </li>
  );
};

export default SidebarMobileItem;
