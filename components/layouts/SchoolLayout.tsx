'use client';
import { FC, ReactNode,useMemo } from 'react';
import Sidebar from '../common/sidebar/sidebar';
import { usePathname } from 'next/navigation';
import Navbar from '../common/navbar/MainBar';
import { useRouter } from "next/navigation";
import { removeToken, removeUserId } from "@/app/utils/encryption";

import { useResponsive } from '@/lib/hooks';
interface IProps {
  children: ReactNode;
}

export const SchoolLayout: FC<IProps> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { isMobile } = useResponsive()

  const showLayout = useMemo(() => {
    if (!pathname) return  false

    const routes = [
        '/schools/onboarding',
        '/schools/forget-password',
        '/schools/sign-in'
    ]

    return routes.some(route => pathname.startsWith(route))

  }, [pathname])

  const sidebarLinks = [
    {
      icon: "/assets/sidebaricons/dashboard.svg",
      title: 'Dashboard',
      path: '/schools/dashboard',
    },
    {
      icon: "/assets/sidebaricons/classroom.svg",
      title: 'Classrooms',
      path: '/schools/classrooms',
    },
    {
      icon: "/assets/sidebaricons/students.svg",
      title: 'Students',
      path: '/schools/students',
    },
    {
      icon: "/assets/sidebaricons/teachers.svg",
      title: 'Teachers',
      path: '/schools/teachers',
    },
    {
      icon: "/assets/sidebaricons/managements.svg",
      title: 'Management',
      path: '/admin/management',
    },
  ]

  if (showLayout) {
    return <>{children}</>
  }

  return (
    <div className="md:flex md:justify-stretch min-h-screen">
      <div className="block w-[70px] md:w-[240px] bg-[#F6F8F9] dark:bg-slate-900">
        <div className='flex'>
          <Sidebar isMobileSidebar={isMobile} isVerticalIcon={false} pathname={pathname as string} sidebarLinks={sidebarLinks} />
          <Navbar onLogout={() => {
            removeToken();
            removeUserId()
            router.push("/login")
          }} />
        </div>
      </div>
      <div className="block md:w-full pl-0 md:pl-8 pt-[60px] overflow-hidden bg-[#FDFDFD]">
        <div className="mx-[10px] my-[30px] md:m-[40px]">
          <div className="main-layout">{children}</div>
        </div>
      </div>
    </div>
  );
};
