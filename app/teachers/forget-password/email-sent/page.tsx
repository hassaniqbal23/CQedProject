'use client';

import { ForgetPasswordSuccess } from '@/components/common/ForgetPasswordSuccess/ForgetPasswordSuccess';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function TeacherForgetPassword() {
  return (
    <>
      <TopNavbar showLogout={false}></TopNavbar>
      <ForgetPasswordSuccess
        email={'teacher1@gmail.com'}
        backLink={'/teachers/sign-in'}
      ></ForgetPasswordSuccess>
    </>
  );
}
