import OnboardingTeacherAcceptInvitePage from '@/components/PageContainers/Teacher/Onboarding/TeacherAcceptInvitePage/TeacherAcceptInvitePage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accept Invite - Onboarding - Teacher - GCED',
  description: 'Accept Invite - Onboarding - Teacher - GCED',
};

const TeacherAcceptInvite = () => {
  return (
    <OnboardingTeacherAcceptInvitePage></OnboardingTeacherAcceptInvitePage>
  );
};

TeacherAcceptInvite.showLayout = false;

export default TeacherAcceptInvite;
