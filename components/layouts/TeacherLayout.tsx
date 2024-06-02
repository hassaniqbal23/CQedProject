'use client';
import { FC, ReactNode, Suspense, useMemo } from 'react';
import Sidebar from '../common/sidebar/sidebar';
import { usePathname } from 'next/navigation';
import Navbar from '../common/navbar/MainBar';
import { useRouter } from 'next/navigation';
import { removeToken, removeUserId } from '@/app/utils/encryption';

import { useResponsive } from '@/lib/hooks';
import { useGlobalState } from '@/app/gobalContext/globalContext';
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
}

export const TeacherLayout: FC<IProps> = ({ children }) => {
  const { logout } = useGlobalState();
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile } = useResponsive();

  const showLayout = useMemo(() => {
    if (!pathname) return false;

    const routes = [
      '/teachers/onboarding',
      '/teachers/forget-password',
      '/teachers/sign-in',
    ];

    return routes.some((route) => pathname.startsWith(route));
  }, [pathname]);

  const sidebarLinks = [
    {
      icon: '/assets/sidebaricons/dashboard.svg',
      title: 'Dashboard',
      path: '/teachers/dashboard',
    },
    {
      icon: '/assets/sidebaricons/chat.svg',
      title: 'Chat & Communities',
      path: '/teachers/chats',
    },
    {
      icon: '/assets/sidebaricons/classroom.svg',
      title: 'Classrooms',
      path: '/teachers/classrooms',
    },
    {
      icon: '/assets/sidebaricons/students.svg',
      title: 'Students',
      path: '/teachers/students',
    },
    {
      icon: '/assets/sidebaricons/CQCommunities.svg',
      title: 'CQ Communities',
      path: '/teachers/cq-communities',
    },
    {
      icon: '/assets/sidebaricons/cqCourses.svg',
      title: 'CQ Courses',
      path: '/teachers/cq-courses',
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
      <div className="block w-[70px] md:w-[240px] bg-[#F6F8F9] dark:bg-slate-900">
        <div className="flex">
          <Sidebar
            isMobileSidebar={isMobile}
            isVerticalIcon={true}
            pathname={pathname as string}
            sidebarLinks={sidebarLinks}
          />
          <Navbar
            horizontalLinks={[
              { href: '/chat', type: 'icon', icon: <MessageCircle /> },
              {
                href: '/notification',
                type: 'icon',
                icon: <Bell />,
              },
              {
                href: '',
                type: 'profile',
                dropdownOption: [
                  {
                    title: 'Profile',
                    path: '/teachers/profile',
                    icon: <Bell size={15} />,
                  },
                  {
                    title: 'Account',
                    path: '/teachers/account',
                    icon: <Settings size={15} />,
                  },
                  {
                    title: 'Your Communities ',
                    path: '/teachers/cq-communities',
                    icon: <UserCheck size={15} />,
                  },
                  {
                    title: 'Help ',
                    path: '/teachers/help',
                    icon: <CircleHelp size={15} />,
                  },
                  {
                    title: 'Logout',
                    icon: <LogOut size={15} />,
                    onClick: () => {
                      removeToken();
                      removeUserId();
                      router.push('/teachers/sign-in');
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
      <div className="block md:w-full pl-0 md:pl-8 pt-[60px] overflow-hidden bg-[#FDFDFD]">
        <div className="mx-[10px] my-[30px] md:m-[40px]">
          <div className="teacher-layout">{children}</div>
        </div>
      </div>
    </div>
  );
};
