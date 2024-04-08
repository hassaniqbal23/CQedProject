'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import { ModeToggle } from '../ModeToggle';
import SidebarMenu from './(components)/SidebarMenu';
import { IIcons } from './sidebar';
import { MdOutlineDashboard } from "react-icons/md";
import { MdAccountTree } from "react-icons/md";
import Image from 'next/image';

export const NewSidebar = () => {
  const [openMenu, setOpenMenu] = useState('');
  // const [showSidebar, setShowSidebar] = useState(false);

  const sidebarLinks: IIcons[] = useMemo(() => [
    {
      Icon: MdOutlineDashboard,
      title: 'Dashboard',
      path: '/dashboard',
      permissions : true
    },
    {
      Icon: MdAccountTree,
      title: 'Account Setting',
      path: '/dashboard/accountsetting/profile',
      permissions : true
    },
  ], []);

  // Dynamically open the submenu based on the pathname
  const pathname = usePathname();
  useEffect(() => {
    const activeItem = sidebarLinks.find(
      (item) =>
        item.submodules &&
        item.submodules.some((sub) => pathname?.includes(sub.path)),
    );
    if (activeItem) {
      setOpenMenu(activeItem.title);
    }
  }, [pathname, sidebarLinks]);

  const toggleMenu = (menuTitle: string) => {
    setOpenMenu(openMenu === menuTitle ? '' : menuTitle);
  };


  console.log(sidebarLinks)


  return (
    <div className='flex ' >
      <aside
        className={`${false ? 'translate-x-0' : '-translate-x-full'
          } fixed top-0 left-0 z-40 md:translate-x-0 h-screen hidden sm:flex flex-col w-60 `}
        style={{ backgroundImage: 'linear-gradient(to bottom, #5429E8, #70369A)' }}
      >
        <div className='flex items-center justify-center py-7' >
          <Image alt='logo' width={150} height={150} src='/logo.svg' />
        </div>
        <div className="flex justify-between flex-col h-full pt-6 pb-[16px] overflow-y-auto">
          <SidebarMenu
            sidebarLinks={sidebarLinks}
            pathname={pathname}
            toggleMenu={toggleMenu}
            openMenu={openMenu}
          />
        </div>
      </aside>
      <Navbar />
    </div>
  );
};

export default NewSidebar;
