import React from 'react';
import OnboardingTeacherAboutYouPage from '@/components/PageContainers/Teacher/Onboarding/TeacherAboutYouPage/TeacherAboutYouPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write about yourself - Onboarding - Teacher - GCED',
  description: 'Write about yourself - Onboarding - Teacher - GCED',
  icons: '/favi.png',
};

const AboutYou = () => {
  return <OnboardingTeacherAboutYouPage></OnboardingTeacherAboutYouPage>;
};

export default AboutYou;
