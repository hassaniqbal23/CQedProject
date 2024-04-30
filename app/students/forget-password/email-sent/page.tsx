'use client';

import { ForgetPasswordSuccess } from '@/components/common/ForgetPasswordSuccess/ForgetPasswordSuccess';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function SchoolForgetPassword() {
  return (
    <>
      <TopNavbar showLogout={false}></TopNavbar>
      <ForgetPasswordSuccess
        email={'jonhn@gmail.com'}
        backLink={'/students/sign-in'}
      ></ForgetPasswordSuccess>
    </>
  );
}
