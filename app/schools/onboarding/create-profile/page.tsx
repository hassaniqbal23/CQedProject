'use client';

import { SchoolDetailsForm } from '@/components/common/SchoolDetailsForm/SchoolDetailsForm';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import { removeToken, removeUserId } from '@/app/utils/encryption';
import { useRouter } from 'next/navigation';

export default function CreateProfile() {
  const router = useRouter();

  const handleLogOut = () => {
    removeToken();
    removeUserId();
    router.push('/schools/sign-in');
  };

  return (
    <div className="h-screen">
      <TopNavbar onLogout={handleLogOut}></TopNavbar>
      <SchoolDetailsForm></SchoolDetailsForm>
    </div>
  );
}

CreateProfile.showLayout = false;
