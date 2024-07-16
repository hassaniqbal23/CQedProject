'use client';

import { ForgetPasswordSuccess } from '@/components/common/ForgetPasswordSuccess/ForgetPasswordSuccess';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function TeacherForgetPasswordEmailSentPage() {
  return (
    <>
      <TopNavbar showLogout={false}></TopNavbar>
      <ForgetPasswordSuccess
        backLink={'/teachers/sign-in'}
      ></ForgetPasswordSuccess>
    </>
  );
}
