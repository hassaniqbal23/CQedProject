import OnboardingUniversityAcceptInvitePage from '@/components/PageContainers/University/Onboarding/UniversityAcceptInvitePage/UniversityAcceptInvitePage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accept Invite - Onboarding - University - GCED',
  description: 'Accept Invite - Onboarding - University - GCED',
};

const UniversityAcceptInvite = () => {
  return (
    <OnboardingUniversityAcceptInvitePage></OnboardingUniversityAcceptInvitePage>
  );
};
UniversityAcceptInvite.showLayout = false;

export default UniversityAcceptInvite;
