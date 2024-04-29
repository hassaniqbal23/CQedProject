'use client';
import { CreateProfile } from '@/components/common/teacherProfile/create-profile';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function TeacherAcceptInvite() {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <CreateProfile></CreateProfile>
    </div>
  );
}

TeacherAcceptInvite.showLayout = false;
