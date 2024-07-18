import OnboardingTeacherQualitiesPage from '@/components/PageContainers/Teacher/Onboarding/TeacherQualitiesPage/TeacherQualitiesPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teacher Qualities - Onboarding - Teacher - GCED',
  description: 'Teacher Qualities - Onboarding - Teacher - GCED',
  icons: '/favi.png',
};

const TeacherQualitiesPage = () => {
  return <OnboardingTeacherQualitiesPage></OnboardingTeacherQualitiesPage>;
};

export default TeacherQualitiesPage;
