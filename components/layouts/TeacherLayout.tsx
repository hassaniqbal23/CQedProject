'use client';
import { FC, ReactNode, Suspense, useMemo, useState } from 'react';
import Sidebar from '../common/sidebar/sidebar';
import { usePathname } from 'next/navigation';
import Navbar from '../common/navbar/MainBar';
import { useGlobalState } from '@/app/globalContext/globalContext';

import { useResponsive } from '@/lib/hooks';
import {
  Bell,
  CircleHelp,
  LogOut,
  MessageCircle,
  Settings,
  UserCheck,
} from 'lucide-react';
import { useChatProvider } from '../Chat/ChatProvider/ChatProvider';
import { PopNotifactions } from '../Notification/PopNotifactions';
import { useMutation, useQueryClient } from 'react-query';
import { notificationMarkRead } from '@/app/api/auth';

interface IProps {
  children: ReactNode;
}

export const TeacherLayout: FC<IProps> = ({ children }) => {
  const { logout } = useGlobalState();
  const pathname = usePathname();
  const client = useQueryClient();
  const { isTabletMini } = useResponsive();
  const [isOpenNotifications, setIsOpenNotifications] =
    useState<boolean>(false);
  const { userInformation } = useGlobalState();
  const { totalUnreadMessages } = useChatProvider();

  const { mutate: muateNotificationMarkRead } = useMutation(
    (payload: { id?: number; status: true }) =>
      notificationMarkRead(payload as { id: number; status: true }),
    {
      onSuccess: (res) => {
        client.refetchQueries('getNotifications');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

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
      icon: '/assets/sidebaricons/home.svg',
      title: 'Home',
      path: '/teachers/dashboard',
    },
    {
      icon: '/assets/sidebaricons/chat.svg',
      title: 'Chats',
      path: '/teachers/chats',
    },
    {
      icon: '/assets/sidebaricons/penpalship.svg',
      title: 'Global Friends',
      path: '/teachers/global-friends?tab=GlobalCommunity',
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
    {
      icon: '/assets/sidebaricons/settings.svg',
      title: 'Settings',
      path: '/teachers/account-settings',
    },
  ];

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
            sidebarLinks={sidebarLinks}
            pathname={pathname as string}
            isVerticalIcon={true}
            horizontalLinks={[
              {
                href: '/teachers/chats',
                type: 'icon',
                icon: (
                  <div className="relative ">
                    {totalUnreadMessages > 0 && (
                      <div className="absolute bg-red-600 h-4 w-4 text-[10px] font-medium flex text-slate-100 rounded-3xl -right-3 -top-3 items-center justify-center">
                        <span>{totalUnreadMessages}</span>
                      </div>
                    )}
                    <MessageCircle />
                  </div>
                ),
              },
              {
                type: 'icon',
                href: 'notification',
                icon: (
                  <>
                    <PopNotifactions
                      IconName={<Bell size={24} className=" text-black" />}
                      open={isOpenNotifications}
                      onClose={() => setIsOpenNotifications(false)}
                      onOpenChange={() => {
                        muateNotificationMarkRead({
                          status: true,
                        });
                        setIsOpenNotifications(!isOpenNotifications);
                      }}
                      linkType="teachers"
                      seeAllLink="/teachers/notifications"
                    />
                  </>
                ),
              },
              {
                href: '',
                type: 'profile',
                dropdownOption: [
                  {
                    title: 'Profile',
                    path: `/teachers/profile/${userInformation.id}`,
                    icon: <Bell size={15} />,
                  },
                  {
                    title: 'Account',
                    path: '/teachers/account-settings',
                    icon: <Settings size={15} />,
                  },
                  {
                    title: 'Your Communities ',
                    path: '/teachers/cq-communities/your-communities',
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
        className={`block md:w-full ${isTabletMini ? 'px-6 pb-24' : ''} ${isChatPage ? '' : 'lg:pl-8'} ${isChatPage ? 'pt-[74px] pl-[42px]' : 'pt-[60px]'} overflow-hidden ${pathname?.includes('cq-communities') ? 'bg-[#EEF3FE]' : 'bg-[#FAFAFA]'}`}
      >
        <div
          className={`${isChatPage ? '' : 'mx-[10px] my-[30px]'} ${isTabletMini ? '' : `${isChatPage ? '' : 'md:m-[40px]'}`}`}
        >
          <div className="teacher-layout">{children}</div>
        </div>
      </div>
    </div>
  );
};
