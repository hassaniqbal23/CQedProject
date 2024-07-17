'use client';

import TopNavbar from '@/components/common/navbar/TopNavbar';
import StudentsDetailsFrom from '@/components/common/StudentDetailsForm';

export default function OnBoardingStudentCreateProfilePage() {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <StudentsDetailsFrom></StudentsDetailsFrom>
    </div>
  );
}

OnBoardingStudentCreateProfilePage.showLayout = false;
