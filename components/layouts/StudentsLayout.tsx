'use client';
import { FC, ReactNode, Suspense, useMemo } from 'react';
import Sidebar from '../common/sidebar/sidebar';
import { usePathname } from 'next/navigation';
import Navbar from '../common/navbar/MainBar';
import { useRouter } from 'next/navigation';
import { useResponsive } from '@/lib/hooks';
import { Bell, LogOut, MessageCircle, Settings, UserCheck } from 'lucide-react';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useChatProvider } from '../Chat/ChatProvider/ChatProvider';
interface IProps {
  children: ReactNode;
  className?: string;
}

export const StudentsLayout: FC<IProps> = ({ children, className }) => {
  const { totalUnreadMessages } = useChatProvider();
  const { logout } = useGlobalState();
  const pathname = usePathname();
  const router = useRouter();
  const { isTabletMini } = useResponsive();
  const { userInformation } = useGlobalState();

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
      title: 'Global Friends',
      path: '/students/globalfriends',
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
    {
      icon: '/assets/sidebaricons/settings.svg',
      title: 'Settings',
      path: '/students/account-settings',
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
            sidebarLinks={sidebarLinks}
            pathname={pathname as string}
            isVerticalIcon={true}
            horizontalLinks={[
              {
                href: '/students/chats',
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
                    path: `/students/profile/${userInformation.id}`,
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
        className={`block md:w-full ${isTabletMini ? 'px-6 pb-24' : ''} ${isChatPage ? '' : 'lg:pl-8'} ${isChatPage ? 'pt-[73px] pl-[42px]' : 'pt-[60px]'} overflow-hidden ${pathname?.includes('cq-communities') ? 'bg-[#EEF3FE]' : 'bg-[#FAFAFA]'}`}
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
