'use client';
import { FC, ReactNode, Suspense, useMemo } from 'react';
import Sidebar from '../common/sidebar/sidebar';
import { usePathname } from 'next/navigation';
import Navbar from '../common/navbar/MainBar';
import { useRouter } from 'next/navigation';
import { removeToken, removeUserId } from '@/app/utils/encryption';

import { useResponsive } from '@/lib/hooks';
import { Bell, MessageCircle } from 'lucide-react';
interface IProps {
  children: ReactNode;
}

export const StudentsLayout: FC<IProps> = ({ children }) => {
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
      icon: '/assets/sidebaricons/classroomstudents.svg',
      title: 'Classroom',
      path: '/students/classroom',
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
            onLogout={() => {
              removeToken();
              removeUserId();
              router.push('/login');
            }}
            links={[
              { src: 'chat', type: 'icon', icon: <MessageCircle /> },
              {
                src: 'notification',
                type: 'icon',
                icon: <Bell />,
              },
              {
                src: '',
                type: 'profile',
              },
            ]}
          />
        </div>
      </div>
      <div
        className={`block md:w-full ${isTabletMini ? 'px-6 pb-24' : ''} lg:pl-2 pt-[40px] overflow-hidden bg-[#FDFDFD]`}
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
