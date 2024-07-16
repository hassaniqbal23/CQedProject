import TeacherForgetPasswordEmailSentPage from '@/components/PageContainers/Teacher/TeacherForgetPasswordEmailSentPage/TeacherForgetPasswordEmailSentPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Sent - GCED',
  description: 'Email Sent - GCED',
};

export default function TeacherForgetPassword() {
  return (
    <>
      <TeacherForgetPasswordEmailSentPage></TeacherForgetPasswordEmailSentPage>
    </>
  );
}
