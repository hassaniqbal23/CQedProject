'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import { ModeToggle } from '../ModeToggle';
import SidebarMenu from './(components)/SidebarMenu';
import { IIcons } from './sidebar';
import { MdOutlineDashboard } from "react-icons/md";
import { MdAccountTree } from "react-icons/md";

export const NewSidebar = () => {
  const [openMenu, setOpenMenu] = useState('');
  // const [showSidebar, setShowSidebar] = useState(false);

  const sidebarLinks: IIcons[] = useMemo(() => [
    {
      Icon: MdOutlineDashboard,
      title: 'Dashboard',
      path: '/dashboard',
    },
    {
      Icon: MdAccountTree,
      title: 'Account Setting',
      path: '/dashboard/accountsetting/profile',
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

 

  return (
    <>
      <Navbar  />
      <aside
        className={`${
          false ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 z-40 w-[240px] md:translate-x-0 h-screen pt-[61px] bg-white dark:bg-gray-800`}
      >
        <div className="flex justify-between flex-col h-full px-[16px] pt-6 pb-[16px] overflow-y-auto bg-[#F5F6FF] dark:bg-gray-800">
          <SidebarMenu
            sidebarLinks={sidebarLinks}
            pathname={pathname}
            toggleMenu={toggleMenu}
            openMenu={openMenu}
          />
          <ModeToggle />
        </div>
      </aside>
    </>
  );
};

export default NewSidebar;
