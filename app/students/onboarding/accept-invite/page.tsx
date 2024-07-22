import OnBoardingStudentAcceptInvite from '@/components/PageContainers/Student/Onboarding/StudentAcceptInvitePage/StudentAcceptInvitePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accept Invite - Onboarding - GCED',
  description: 'Accept Invite - Onboarding - GCED',
  icons: '/favi.png',
};

export default async function StudentAcceptInvite() {
  return <OnBoardingStudentAcceptInvite />;
}
