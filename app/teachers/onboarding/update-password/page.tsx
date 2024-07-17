import OnboardingTeacherUpdatePasswordPage from '@/components/PageContainers/Teacher/Onboarding/TeacherUpdatePasswordPage/TeacherUpdatePasswordPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Password - Onboarding - Teacher - GCED',
  description: 'Update Password - Onboarding - Teacher - GCED',
};

const TeacherOnBoardingUpdatePassword = () => {
  return (
    <OnboardingTeacherUpdatePasswordPage></OnboardingTeacherUpdatePasswordPage>
  );
};

export default TeacherOnBoardingUpdatePassword;
