import OnboardingTeacherSuccessPage from '@/components/PageContainers/Teacher/Onboarding/TeacherSuccessPage/TeacherSuccessPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success - Onboarding - Teacher - GCED',
  description: 'Success - Onboarding - Teacher - GCED',
  icons: '/favi.png',
};

const TeacherSuccessPage = () => {
  return <OnboardingTeacherSuccessPage></OnboardingTeacherSuccessPage>;
};

export default TeacherSuccessPage;
