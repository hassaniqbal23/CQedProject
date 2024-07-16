import { SignInUni } from '@/components/common/UniversitiesSignIn/UniversitiesSignIn';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'University SignIn - GCED',
  description: 'University SignIn - GCED',
};

export default function UniversitySignIn() {
  return (
    <SignInUni
      loginSuccessLink={'/universities/dashboard'}
      forgetPasswordLink={'/universities/forget-password'}
    ></SignInUni>
  );
}
