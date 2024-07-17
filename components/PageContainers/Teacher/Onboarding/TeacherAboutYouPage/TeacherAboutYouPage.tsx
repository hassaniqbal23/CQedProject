'use client';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import React from 'react';
import { AboutYou as AboutYouForm } from '@/components/common/teacherProfile/about-you';

const OnboardingTeacherAboutYouPage = () => {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <AboutYouForm />
    </div>
  );
};

export default OnboardingTeacherAboutYouPage;
