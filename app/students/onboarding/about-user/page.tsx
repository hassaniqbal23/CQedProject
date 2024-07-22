import React from 'react';
import OnboardingStudentAboutUserPage from '@/components/PageContainers/Student/Onboarding/StudentAboutUserPage/StudentAboutUserPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write about yourself - Student Onboarding - GCED',
  description: 'Write about yourself - Student Onboarding - GCED',
  icons: '/favi.png',
};

function AboutUserInfo() {
  return (
    <div>
      <OnboardingStudentAboutUserPage />
    </div>
  );
}

export default AboutUserInfo;
