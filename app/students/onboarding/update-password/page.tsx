'use client';

import TopNavbar from '@/components/common/navbar/TopNavbar';
import { UpdatePassword } from '@/components/common/UpdatePassword/UpdatePassword';

export default function SchoolOnBoardingUpdatePassword() {
  return (
    <div className="h-[calc(100vh_-_100px)]">
      <TopNavbar />
      <div className="flex items-center justify-center h-full">
        <div className="flex justify-center items-center bg-white rounded-md pt-[24px] px-[40px] pb-[45px] w-4/6 md:w-3/4 lg:w-2/5 mx-auto">
          <div className="bg-secondary-light w-full md:w-10/12 flex flex-col gap-[30px]  ">
            <UpdatePassword></UpdatePassword>
          </div>
        </div>
      </div>
    </div>
  );
}
