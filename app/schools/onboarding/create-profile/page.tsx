'use client';

import { SchoolDetailsForm } from '@/components/common/SchoolDetailsForm/SchoolDetailsForm';
import BottomNavbar from '@/components/common/navbar/bottomNavbar';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function CreateProfile() {
  return (
    <div className="h-screen">
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <SchoolDetailsForm></SchoolDetailsForm>
    </div>
  );
}

CreateProfile.showLayout = false;
