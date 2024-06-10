'use client';

import { FC } from 'react';
import SidebarMenu from './sidebarMenu';
import Image from 'next/image';
import { ISidebar } from './types';
import SidebarMobileItem from './sidebarMobileItem';

interface IProps {
  sidebarLinks: ISidebar[];
  pathname: string;
  isVerticalIcon: boolean;
  isMobileSidebar?: boolean;
}

export const Sidebar: FC<IProps> = ({
  sidebarLinks,
  pathname,
  isVerticalIcon,
  isMobileSidebar,
}) => {
  if (isMobileSidebar) {
    return (
      <>
        <aside
          className={`fixed bottom-0  left-0  z-40 h-30  w-full bg-primary-500`}
        >
          <div className="flex justify-between flex-col h-full">
            <ul className="flex justify-between items-center px-16">
              {sidebarLinks.map((link: ISidebar, index: number) => {
                return (
                  <SidebarMobileItem
                    pathname={pathname}
                    key={`link-${index}-${link.path}`}
                    sidebarLinks={link}
                  />
                );
              })}
            </ul>
          </div>
        </aside>
      </>
    );
  } else {
    return (
      <>
        <aside
          className={`${
            false ? 'translate-x-0' : '-translate-x-full'
          } fixed bottom-0 left-0 z-40 md:translate-x-0 h-screen hidden sm:flex flex-col w-60 bg-primary-500 `}
        >
          <div className="flex items-center justify-center pt-7">
            <Image
              alt="logo-lo"
              width={150}
              height={150}
              src="/assets/GCEd/GCEdlogo.svg"
              priority={true}
            />
          </div>
          <div className="flex justify-between flex-col h-full pt-6 pb-[16px] overflow-y-auto  scrollbar-hide ">
            <SidebarMenu
              sidebarLinks={sidebarLinks}
              pathname={pathname}
              isVerticalIcon={isVerticalIcon}
            />
          </div>
        </aside>
      </>
    );
  }
};

export default Sidebar;
