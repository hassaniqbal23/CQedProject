import OnBoardingStudentQualitiesPage from '@/components/PageContainers/Student/Onboarding/StudentQualitiesPage/StudentQualitiesPage';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Student Qualities - Onboarding - GCED',
  description: 'Student Qualities - Onboarding - GCED',
};

function studentQualities() {
  return (
    <div>
      <OnBoardingStudentQualitiesPage />
    </div>
  );
}

export default studentQualities;
