import OnboardingUniversityCreateProfilePage from '@/components/PageContainers/University/Onboarding/UniversityCreateProfilePage/UniversityCreateProfilePage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Profile - Onboarding - University - GCED',
  description: 'Create Profile - Onboarding - University - GCED',
};

const UniversityCreateProfile = () => {
  return (
    <OnboardingUniversityCreateProfilePage></OnboardingUniversityCreateProfilePage>
  );
};

UniversityCreateProfile.showLayout = false;

export default UniversityCreateProfile;
