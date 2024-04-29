'use client';

import { SchoolDetailsForm } from '@/components/common/SchoolDetailsForm/SchoolDetailsForm';
import BottomNavbar from '@/components/common/navbar/bottomNavbar';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function SchoolAcceptInvite() {
  return (
    <div className="flex flex-col justify-between h-screen ">
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <SchoolDetailsForm></SchoolDetailsForm>
      <BottomNavbar
        onBackButton={() => {}}
        onContinue={() => {}}
      ></BottomNavbar>
    </div>
  );
}

SchoolAcceptInvite.showLayout = false;
