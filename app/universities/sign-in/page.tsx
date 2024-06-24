import { SignInUni } from '@/components/common/UniversitiesSignIn/UniversitiesSignIn';

export default function UniversitySignIn() {
  return (
    <SignInUni
      loginSuccessLink={'/universities/dashboard'}
      forgetPasswordLink={'/universities/forget-password'}
    ></SignInUni>
  );
}
