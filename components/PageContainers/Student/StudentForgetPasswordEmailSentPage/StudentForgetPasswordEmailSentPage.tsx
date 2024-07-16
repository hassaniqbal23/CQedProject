'use client';

import { ForgetPasswordSuccess } from '@/components/common/ForgetPasswordSuccess/ForgetPasswordSuccess';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function StudentForgetPasswordEmailSentPage() {
  return (
    <>
      <TopNavbar showLogout={false}></TopNavbar>
      <ForgetPasswordSuccess
        backLink={'/students/sign-in'}
      ></ForgetPasswordSuccess>
    </>
  );
}
