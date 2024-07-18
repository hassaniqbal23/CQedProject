import StudentForgetPasswordPage from '@/components/PageContainers/Student/StudentForgetPasswordPage/StudentForgetPasswordPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forget Password - GCED',
  description: 'Forget Password - GCED',
  icons: '/favi.png',
};

export default function PasswordPage() {
  return (
    <div>
      <StudentForgetPasswordPage></StudentForgetPasswordPage>
    </div>
  );
}
