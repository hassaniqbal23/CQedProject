import { SignUp } from '@/components/Auth/Sign-up/Sign-up';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teacher Sign Up - GCED',
  description: 'Teacher Sign Up - GCED',
};

export default function TeacherSignUp() {
  return (
    <SignUp
      loginSuccessLink={'/teachers/onboarding/create-profile'}
      loginWithGoogleORFacebook={'/teachers/dashboard'}
      forgetPasswordLink={'/teachers/forget-password'}
      signinLink={'/teachers/sign-in'}
      role={'teacher'}
    ></SignUp>
  );
}
