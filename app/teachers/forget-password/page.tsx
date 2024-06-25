'use client';

import { ForgetPassword } from '@/components/common/ForgetPassword/ForgetPassword';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import { useRouter } from 'next/navigation';

export default function TeacherForgetPassword() {
  const router = useRouter();
  return (
    <>
      <TopNavbar showLogout={false}></TopNavbar>
      <div className="max-w-md mx-auto flex justify-center items-center h-[80vh] p-2 ">
        <ForgetPassword
          onSubmit={() => {
            router.push('/teachers/forget-password/email-sent');
          }}
          onClick={() => {}}
        ></ForgetPassword>
      </div>
    </>
  );
}
