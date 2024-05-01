'use client';

import BottomNavbar from '@/components/common/navbar/bottomNavbar';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import StudentsDetailsFrom from '@/components/common/StudentDetailsForm';

export default function createStudentsProfile() {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <StudentsDetailsFrom></StudentsDetailsFrom>
    </div>
  );
}

createStudentsProfile.showLayout = false;
