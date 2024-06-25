'use client';

import { ForgetPassword } from '@/components/common/ForgetPassword/ForgetPassword';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import { useRouter } from 'next/navigation';

export default function SchoolForgetPassword() {
  const router = useRouter();
  return (
    <>
      <TopNavbar showLogout={false}></TopNavbar>
      <div className="grid grid-cols-1 md:grid-cols-1 items-center">
        <div className="flex justify-center items-center bg-white rounded-md shadow-md pt-[24px] px-[40px] pb-[45px] w-4/6 md:w-2/5 lg:w-2/6 mx-auto">
          <div className="bg-secondary-light w-full md:w-9/9 flex flex-col gap-[30px]  ">
            <ForgetPassword
              onSubmit={() => {
                router.push('/students/forget-password/email-sent');
              }}
              onClick={() => { }}
            ></ForgetPassword>
          </div>
        </div>
      </div>
    </>
  );
}
