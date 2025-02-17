'use client';
import { FC, ReactNode, Suspense, useMemo } from 'react';
import Sidebar from '../common/sidebar/sidebar';
import { usePathname } from 'next/navigation';
import Navbar from '../common/navbar/MainBar';
import { useRouter } from 'next/navigation';

import { useResponsive } from '@/lib/hooks';
import { Bell, LogOut, Settings } from 'lucide-react';
import { useGlobalState } from '@/app/globalContext/globalContext';
interface IProps {
  children: ReactNode;
}

export const UniversityLayout: FC<IProps> = ({ children }) => {
  const { logout } = useGlobalState();
  const pathname = usePathname();
  const router = useRouter();
  const { isTabletMini } = useResponsive();

  const showLayout = useMemo(() => {
    if (!pathname) return false;

    const routes = [
      '/universities/onboarding',
      '/universities/forget-password',
      '/universities/sign-in',
    ];

    return routes.some((route) => pathname.startsWith(route));
  }, [pathname]);

  const sidebarLinks = [
    {
      icon: '/assets/sidebaricons/dashboard.svg',
      title: 'Dashboard',
      path: '/universities/dashboard',
    },
    {
      icon: '/assets/sidebaricons/students.svg',
      title: 'Students',
      path: '/universities/students',
    },
    {
      icon: '/assets/sidebaricons/teachers.svg',
      title: 'Teachers',
      path: '/universities/teachers',
    },
    {
      icon: '/assets/sidebaricons/report.svg',
      title: 'Reports',
      path: '/universities/reported-users',
    },
    {
      icon: '/assets/sidebaricons/settings.svg',
      title: 'Settings',
      path: '/universities/settings',
    },
  ];

  if (showLayout) {
    return (
      <>
        <Suspense>{children}</Suspense>
      </>
    );
  }

  return (
    <div className="md:flex md:justify-stretch min-h-screen">
      <div
        className={`block ${isTabletMini ? '' : 'w-[70px] md:w-[240px]'} bg-[#F6F8F9] dark:bg-slate-900`}
      >
        <div className="flex">
          <Sidebar
            isMobileSidebar={isTabletMini}
            isVerticalIcon={false}
            pathname={pathname as string}
            sidebarLinks={sidebarLinks}
          />
          <Navbar
            sidebarLinks={sidebarLinks}
            pathname={pathname as string}
            isVerticalIcon={false}
            horizontalLinks={[
              {
                href: 'notification',
                icon: <Bell size={24} className=" text-black" />,
                type: 'icon',
              },
              {
                href: '',
                type: 'profile',
                dropdownOption: [
                  // {
                  //   title: 'Profile',
                  //   path: '/university/profile',
                  //   icon: <Bell size={15} />,
                  // },
                  {
                    title: 'Account',
                    path: '/universities/settings',
                    icon: <Settings size={15} />,
                  },
                  // {
                  //   title: 'Help ',
                  //   path: '/universities/help',
                  //   icon: <CircleHelp size={15} />,
                  // },
                  {
                    title: 'Logout',
                    icon: <LogOut size={15} />,
                    onClick: () => {
                      logout();
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
      <div
        className={`block md:w-full ${isTabletMini ? 'px-6 pb-24' : ''} lg:pl-8 pt-[60px] overflow-hidden bg-[#FDFDFD]`}
      >
        <div
          className={`mx-[10px] my-[30px] ${isTabletMini ? '' : 'md:m-[40px]'}`}
        >
          <div className="school-layout">{children}</div>
        </div>
      </div>
    </div>
  );
};
