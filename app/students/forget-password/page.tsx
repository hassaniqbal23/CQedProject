import StudentForgetPasswordPage from '@/components/PageContainers/Student/StudentForgetPasswordPage/StudentForgetPasswordPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forget Password - GCED',
  description: 'Forget Password - GCED',
};

export default function PasswordPage() {
  return (
    <div>
      <StudentForgetPasswordPage></StudentForgetPasswordPage>
    </div>
  );
}
