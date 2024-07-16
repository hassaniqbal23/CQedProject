import TeacherForgetPasswordPage from '@/components/PageContainers/Teacher/TeacherForgetPasswordPage/TeacherForgetPasswordPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forget Password - GCED',
  description: 'Forget Password - GCED',
};

export default function ForgetPassword() {
  return (
    <>
      <TeacherForgetPasswordPage></TeacherForgetPasswordPage>
    </>
  );
}
