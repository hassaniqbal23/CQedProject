import SchoolOnBoardingUpdatePassword from '@/components/PageContainers/Student/Onboarding/StudentUpdatePasswordPage/StudentUpdatePasswordPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Password - Onboarding - GCED',
  description: 'Update Password - Onboarding - GCED',
};

export default function UpdatePassword() {
  return <SchoolOnBoardingUpdatePassword></SchoolOnBoardingUpdatePassword>;
}
