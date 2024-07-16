import OnboardingTeacherAcceptInvitePage from '@/components/PageContainers/Teacher/Onboarding/TeacherAcceptInvitePage/TeacherAcceptInvitePage';
import React from 'react';

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

OnboardingTeacherAcceptInvitePage.showLayout = false;

export default TeacherAcceptInvite;
