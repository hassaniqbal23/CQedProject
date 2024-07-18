import { SignIn } from '@/components/common/SignIn-Page/SignInpage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Sign In - GCED',
  description: 'Student Sign In - GCED',
};

export default function StudentSignIn() {
  return (
    <SignIn
      loginSuccessLink={'/students/dashboard/'}
      signupLink="/students/sign-up"
      loginWithNewUserSuccessLink={'/students/onboarding/create-profile'}
      forgetPasswordLink={'/students/forget-password'}
      role="student"
    ></SignIn>
  );
}
