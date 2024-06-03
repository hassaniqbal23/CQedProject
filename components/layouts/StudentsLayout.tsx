'use client';
import { FC, ReactNode, Suspense, useMemo } from 'react';
import Sidebar from '../common/sidebar/sidebar';
import { usePathname } from 'next/navigation';
import Navbar from '../common/navbar/MainBar';
import { useRouter } from 'next/navigation';
import { removeToken, removeUserId } from '@/app/utils/encryption';

import { useResponsive } from '@/lib/hooks';
import {
  Bell,
  CircleHelp,
  LogOut,
  MessageCircle,
  Settings,
  UserCheck,
} from 'lucide-react';
interface IProps {
  children: ReactNode;
  className?: string;
}

export const StudentsLayout: FC<IProps> = ({ children, className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isTabletMini } = useResponsive();

  const showLayout = useMemo(() => {
    if (!pathname) return false;

    const routes = [
      '/students/onboarding',
      '/students/forget-password',
      '/students/sign-in',
    ];

    return routes.some((route) => pathname.startsWith(route));
  }, [pathname]);

  const isChatPage = useMemo(() => {
    const routes = [
      '/students/chats',
      '/teachers/chats',
      '/students/chat',
      '/teachers/chat',
      '/schools/chat',
      '/schools/chats',
    ];
    if (!pathname) return false;
    return !!routes.find((route) => pathname.startsWith(route));
  }, [pathname]);

  const sidebarLinks = [
    {
      icon: '/assets/sidebaricons/dashboard.svg',
      title: 'Dashboard',
      path: '/students/dashboard',
    },
    {
      icon: '/assets/sidebaricons/chat.svg',
      title: 'Chats',
      path: '/students/chats',
    },
    {
      icon: '/assets/sidebaricons/penpalship.svg',
      title: 'Penpalship',
      path: '/students/penpalship',
    },
    {
      icon: '/assets/sidebaricons/CQCommunities.svg',
      title: 'CQ Communities',
      path: '/students/cq-communities',
    },
    {
      icon: '/assets/sidebaricons/cqCourses.svg',
      title: 'CQ Courses',
      path: '/students/cq-courses',
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
            isVerticalIcon={true}
            pathname={pathname as string}
            sidebarLinks={sidebarLinks}
          />
          <Navbar
            horizontalLinks={[
              {
                href: '/students/chats',
                type: 'icon',
                icon: <MessageCircle />,
              },
              {
                href: '/students/notifications',
                type: 'icon',
                icon: <Bell />,
              },
              {
                href: '',
                type: 'profile',
                dropdownOption: [
                  {
                    title: 'Profile',
                    path: '/students/profile',
                    icon: <Bell size={15} />,
                  },
                  {
                    title: 'Account',
                    path: '/students/account-settings',
                    icon: <Settings size={15} />,
                  },
                  {
                    title: 'Your Communities ',
                    path: '/students/cq-communities/your-communities',
                    icon: <UserCheck size={15} />,
                  },
                  // {
                  //   title: 'Help ',
                  //   path: '/students/help',
                  //   icon: <CircleHelp size={15} />,
                  // },
                  {
                    title: 'Logout',
                    icon: <LogOut size={15} />,
                    onClick: () => {
                      removeToken();
                      removeUserId();
                      router.push('/students/sign-in');
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
      <div
        className={`block md:w-full ${isTabletMini ? 'px-6 pb-24' : ''} ${isChatPage ? '' : 'lg:pl-8'} ${isChatPage ? 'pt-[73px] pl-[42px]' : 'pt-[60px]'} overflow-hidden ${pathname?.includes('cq-communities') ? 'bg-[#EEF3FE]' : 'bg-[#FDFDFD]'}`}
      >
        <div
          className={`${isChatPage ? '' : 'mx-[10px] my-[30px]'} ${isTabletMini ? '' : `${isChatPage ? '' : 'md:m-[40px]'}`}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
