'use client';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import React from 'react';
import { AboutYou as AboutYouForm } from '@/components/common/teacherProfile/about-you';
import { useGlobalState } from '@/app/globalContext/globalContext';

const OnboardingTeacherAboutYouPage = () => {
  const { logout } = useGlobalState();
  return (
    <div>
      <TopNavbar
        onLogout={() => {
          logout();
        }}
      ></TopNavbar>
      <AboutYouForm />
    </div>
  );
};

export default OnboardingTeacherAboutYouPage;
