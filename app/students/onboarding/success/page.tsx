import OnBoardingStudentSuccessPage from '@/components/PageContainers/Student/Onboarding/StudentSuccessPage/StudentSuccessPage';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Success - Onboarding - GCED',
  description: 'Success - Onboarding - GCED',
};

function Success() {
  return <OnBoardingStudentSuccessPage></OnBoardingStudentSuccessPage>;
}

export default Success;
