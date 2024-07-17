import OnBoardingStudentCreateProfilePage from '@/components/PageContainers/Student/Onboarding/StudentCreateProfilePage/StudentCreateProfilePage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Profile - Onboarding - GCED',
  description: 'Create Profile - Onboarding - GCED',
};

export default function createStudentsProfile() {
  return (
    <div>
      <OnBoardingStudentCreateProfilePage></OnBoardingStudentCreateProfilePage>
    </div>
  );
}

createStudentsProfile.showLayout = false;
