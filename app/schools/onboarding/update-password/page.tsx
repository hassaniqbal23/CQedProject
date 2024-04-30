'use client';

import { UpdatePassword } from '@/components/common/UpdatePassword/UpdatePassword';
import TopNavbar from '@/components/common/navbar/TopNavbar';

export default function SchoolOnBoardingUpdatePassword() {
  return (
    <div className=" w-full h-screen">
      <TopNavbar showLogout={false} />
      <div className="max-w-xl mx-auto  p-5 flex justify-center items-center h-[80vh]  ">
        <UpdatePassword updatePasswordSuccessLink={'/schools/sign-in'} />
      </div>
    </div>
  );
}
