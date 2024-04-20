'use client';
import { FC, ReactNode } from 'react';
import Sidebar from './common/sidebar/sidebar';
import Navbar from './common/navbar/navbar';
import { usePathname } from 'next/navigation';

interface IProps {
  children: ReactNode;
}

export const MainLayout: FC<IProps> = ({ children }) => {
  const pathname =  usePathname()

  const  sidebarLinks =  [
    {
        icon: "/asserts/sidebaricons/dashboard.svg",
        title: 'Dashboard',
        path: '/admin/dashboard',
    },
    {
        icon: "/asserts/sidebaricons/classroom.svg",
        title: 'Classrooms',
        path: '/admin/classrooms',
    },
    {
        icon: "/asserts/sidebaricons/students.svg",
        title: 'Students',
        path: '/admin/students',
    },
    {
        icon: "/asserts/sidebaricons/teachers.svg",
        title: 'Teachers',
        path: '/admin/teachers',
    },
    {
        icon: "/asserts/sidebaricons/managements.svg",
        title: 'Management',
        path: '/admin/management',
    },
]
  return (
    <div className="md:flex md:justify-stretch min-h-screen">
      <div className=" block w-[70px] md:w-[240px] bg-[#F6F8F9] dark:bg-slate-900">
        <div className='flex '>
          <Sidebar isVerticalIcon={false} pathname={pathname as string} sidebarLinks={sidebarLinks}  />
          <Navbar onClick={() => console.log("ok")}/>
        </div>
      </div>
      <div className="block md:w-full pl-0 md:pl-8 pt-[60px] overflow-hidden">
        <div className="mx-[10px] my-[30px] md:m-[40px]">
          <div className="main-layout">{children}</div>
        </div>
      </div>
    </div>
  );
};
