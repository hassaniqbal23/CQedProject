import OnboardingTeacherWelcomePage from '@/components/PageContainers/Teacher/Onboarding/TeacherWelcomePage/TeacherWelcomePage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome - Onboarding - Teacher - GCED',
  description: 'Welcome - Onboarding - Teacher - GCED',
};

const TeacherWelcomePage = () => {
  return <OnboardingTeacherWelcomePage></OnboardingTeacherWelcomePage>;
};

export default TeacherWelcomePage;
