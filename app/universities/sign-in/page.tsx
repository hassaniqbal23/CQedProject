import { SignIn } from '@/components/common/SignIn-Page/SignInpage';

export default function UniversitySignIn() {
  return (
    <SignIn
      loginSuccessLink={'/universities/dashboard'}
      forgetPasswordLink={'/universities/forget-password'}
    ></SignIn>
  );
}
