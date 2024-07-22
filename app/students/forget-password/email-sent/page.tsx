import StudentForgetPasswordEmailSentPage from '@/components/PageContainers/Student/StudentForgetPasswordEmailSentPage/StudentForgetPasswordEmailSentPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Sent - GCED',
  description: 'Email Sent - GCED',
  icons: '/favi.png',
};

export default function SchoolForgetPassword() {
  return (
    <>
      <StudentForgetPasswordEmailSentPage></StudentForgetPasswordEmailSentPage>
    </>
  );
}
