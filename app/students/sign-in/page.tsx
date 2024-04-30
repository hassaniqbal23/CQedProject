import { SignIn } from '@/components/common/SignIn-Page/SignInpage';

export default function SchoolSignIn() {
  return (
    <SignIn
      loginSuccessLink={'/students/dashboard/'}
      forgetPasswordLink={'/students/forget-password'}
    ></SignIn>
  );
}
