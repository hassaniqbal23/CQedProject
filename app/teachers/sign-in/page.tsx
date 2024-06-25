import { SignIn } from '@/components/common/SignIn-Page/SignInpage';

export default function TeacherSignIn() {
  return (
    <SignIn
      loginSuccessLink={'/teachers/dashboard'}
      forgetPasswordLink={'/teachers/forget-password'}
    ></SignIn>
  );
}
