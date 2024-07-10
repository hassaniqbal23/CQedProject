import { SignIn } from '@/components/common/SignIn-Page/SignInpage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Sign In - GCED',
  description: 'Student Sign In - GCED',
};

export default function SchoolSignIn() {
  return (
    <SignIn
      loginSuccessLink={'/students/dashboard/'}
      forgetPasswordLink={'/students/forget-password'}
      role="student"
    ></SignIn>
  );
}
