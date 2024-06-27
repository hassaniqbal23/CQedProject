import Image from 'next/image';
import React from 'react';
import SidebarMenu from '../sidebarMenu';
import { ISidebar } from '../types';

interface ISidebarMobileProps {
  sidebarLinks: ISidebar[];
  pathname: string;
  isVerticalIcon: boolean;
  className?: string;
}

function SidebarMobile({
  sidebarLinks,
  pathname,
  isVerticalIcon,
  className,
}: ISidebarMobileProps) {
  return (
    <div
      className={`fixed bottom-0 left-0  md:translate-x-0 h-screen flex flex-col bg-primary-500 ${className}  `}
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
    </div>
  );
}

export default SidebarMobile;
