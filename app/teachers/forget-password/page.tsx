import TeacherForgetPasswordPage from '@/components/PageContainers/Teacher/TeacherForgetPasswordPage/TeacherForgetPasswordPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forget Password - GCED',
  description: 'Forget Password - GCED',
  icons: '/favi.png',
};

export default function ForgetPassword() {
  return (
    <>
      <TeacherForgetPasswordPage></TeacherForgetPasswordPage>
    </>
  );
}
