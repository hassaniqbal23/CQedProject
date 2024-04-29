'use client';

import { ForgetPasswordSuccess } from '@/components/common/ForgetPasswordSuccess/ForgetPasswordSuccess';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function SchoolForgetPassword() {
  return (
    <>
      <div className="w-full h-screen">
        <TopNavbar showLogout={false}></TopNavbar>
        <div className="flex justify-center items-center h-[80vh] p-5">
          <ForgetPasswordSuccess
            email={'jonhn@gmail.com'}
            backLink={'/schools/sign-in'}
          ></ForgetPasswordSuccess>
        </div>
      </div>
    </>
  );
}
