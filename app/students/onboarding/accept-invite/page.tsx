'use client';

import TopNavbar from '@/components/common/navbar/TopNavbar';
import StudentsDetailsFrom from '@/components/common/StudentDetailsForm';

export default function SchoolAcceptInvite() {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <StudentsDetailsFrom></StudentsDetailsFrom>
    </div>
  );
}

SchoolAcceptInvite.showLayout = false;
