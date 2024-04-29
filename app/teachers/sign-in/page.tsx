import { SignIn } from '@/components/common/SignIn-Page/SignInpage';

export default function TeacherSignIn() {
  return (
    <SignIn
      loginSuccessLink={'/teacher/dashboard'}
      forgetPasswordLink={'/teacher/forget-password'}
    ></SignIn>
  );
}
