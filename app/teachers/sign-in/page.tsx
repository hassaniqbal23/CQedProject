import { SignIn } from '@/components/common/SignIn-Page/SignInpage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teacher Sign In - GCED',
  description: 'Teacher Sign In - GCED',
};

export default function TeacherSignIn() {
  return (
    <SignIn
      signupLink="/teachers/sign-up"
      loginSuccessLink={'/teachers/dashboard'}
      forgetPasswordLink={'/teachers/forget-password'}
      role={'teacher'}
    ></SignIn>
  );
}
