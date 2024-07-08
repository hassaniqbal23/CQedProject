'use client';
import { FC, ReactNode, Suspense, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { removeToken, removeUserId } from '@/app/utils/encryption';
import { useResponsive } from '@/lib/hooks';
import Sidebar from '../common/sidebar/sidebar';
import Navbar from '../common/navbar/MainBar';
import { Bell, CircleHelp, LogOut, Settings } from 'lucide-react';
import { useGlobalState } from '@/app/globalContext/globalContext';

interface IProps {
  children: ReactNode;
}

export const AdminLayout: FC<IProps> = ({ children }) => {
  const { logout } = useGlobalState();
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, isTabletMini, isTabletOrMobile } = useResponsive();

  const showLayout = useMemo(() => {
    if (!pathname) return false;

    const routes = ['/admin/forgot-password', '/login'];

    return routes.some((route) => pathname.startsWith(route));
  }, [pathname]);

  const sidebarLinks = [
    {
      icon: '/assets/sidebaricons/dashboard.svg',
      title: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      icon: '/assets/sidebaricons/schools.svg',
      title: 'Universities',
      path: '/admin/universities',
    },
    {
      icon: '/assets/sidebaricons/accounts.svg',
      title: 'Accounts',
      path: '/admin/accounts',
    },
    {
      icon: '/assets/sidebaricons/settings.svg',
      title: 'Settings',
      path: '/admin/reported-users',
    },
    {
      icon: '/assets/sidebaricons/settings.svg',
      title: 'Settings',
      path: '/admin/settings',
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
        <div className="flex ">
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
                href: '',
                type: 'profile',
                dropdownOption: [
                  // {
                  //   title: 'Profile',
                  //   path: '/admin/profile',
                  //   icon: <Bell size={15} />,
                  // },
                  {
                    title: 'settings',
                    path: '/admin/settings',
                    icon: <Settings size={15} />,
                  },

                  // {
                  //   title: 'Help ',
                  //   path: '/admin/help',
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
          <div className="admin-layout">{children}</div>
        </div>
      </div>
    </div>
  );
};
