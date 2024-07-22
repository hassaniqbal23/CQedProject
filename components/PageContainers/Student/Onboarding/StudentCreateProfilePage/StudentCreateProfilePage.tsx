'use client';

import { useGlobalState } from '@/app/globalContext/globalContext';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import StudentsDetailsFrom from '@/components/common/StudentDetailsForm';

export default function OnBoardingStudentCreateProfilePage() {
  const { logout } = useGlobalState();
  return (
    <div>
      <TopNavbar
        onLogout={() => {
          logout();
        }}
      ></TopNavbar>
      <StudentsDetailsFrom></StudentsDetailsFrom>
    </div>
  );
}

OnBoardingStudentCreateProfilePage.showLayout = false;
