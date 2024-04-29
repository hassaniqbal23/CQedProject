'use client';
import { CreateProfile as Profile } from '@/components/common/teacherProfile/create-profile';

import BottomNavbar from '@/components/common/navbar/bottomNavbar';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function TeacherAcceptInvite() {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <Profile></Profile>
    </div>
  );
}

TeacherAcceptInvite.showLayout = false;
