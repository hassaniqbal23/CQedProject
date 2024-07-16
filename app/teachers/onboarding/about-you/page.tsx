import React from 'react';
import OnboardingTeacherAboutYouPage from '@/components/PageContainers/Teacher/Onboarding/TeacherAboutYouPage/TeacherAboutYouPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write about yourself - Onboarding - Teacher - GCED',
  description: 'Write about yourself - Onboarding - Teacher - GCED',
};

const AboutYou = () => {
  return <OnboardingTeacherAboutYouPage></OnboardingTeacherAboutYouPage>;
};
