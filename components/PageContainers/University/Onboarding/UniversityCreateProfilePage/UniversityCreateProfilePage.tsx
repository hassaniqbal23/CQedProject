'use client';

import { SchoolDetailsForm } from '@/components/common/SchoolDetailsForm/SchoolDetailsForm';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/app/globalContext/globalContext';

export default function OnboardingUniversityCreateProfilePage() {
  const router = useRouter();
  const { logout } = useGlobalState();

  return (
    <div className="h-screen">
      <TopNavbar onLogout={logout}></TopNavbar>
      <SchoolDetailsForm></SchoolDetailsForm>
    </div>
  );
}
