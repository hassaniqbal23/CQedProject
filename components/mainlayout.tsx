'use client';
import { FC, ReactNode } from 'react';
import NewSideBar from './dashboardlayout/newSideBar';

interface IProps {
  children: ReactNode;
}

export const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="md:flex md:justify-stretch min-h-screen">
      <div className=" block w-[70px] md:w-[240px] bg-[#F6F8F9] dark:bg-slate-900">
        <NewSideBar />
      </div>
      <div className="block md:w-full pl-0 md:pl-8 pt-[60px] overflow-hidden">
        <div className="mx-[10px] my-[30px] md:m-[40px]">
          <div className="main-layout">{children}</div>
        </div>
      </div>
    </div>
  );
};
