import { SignIn } from '@/components/common/SignIn-Page/SignInpage';

export default function SchoolSignIn() {
  return <SignIn forgetPasswordLink={'/students/forget-password'}></SignIn>;
}
