import { SignUp } from '@/components/Auth/Sign-up/Sign-up';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Sign Up - GCED',
  description: 'Student Sign Up - GCED',
  icons: '/favi.png',
};

const StudentSignUp = () => {
  return (
    <SignUp
      loginSuccessLink={'/students/onboarding/create-profile'}
      loginWithGoogleORFacebook={'/students/dashboard'}
      forgetPasswordLink={'/students/forget-password'}
      signinLink={'/students/sign-in'}
      role={'student'}
    ></SignUp>
  );
};

export default StudentSignUp;
