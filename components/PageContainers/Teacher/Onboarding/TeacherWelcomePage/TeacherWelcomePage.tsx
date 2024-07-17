'use client';
import React from 'react';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import { GreatJob } from '@/components/common/teacherProfile/great-job';

const OnboardingTeacherWelcomePage = () => {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <GreatJob />
    </div>
  );
};

export default OnboardingTeacherWelcomePage;
