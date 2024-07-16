'use client';

import { UpdatePassword } from '@/components/common/UpdatePassword/UpdatePassword';

export default function OnboardingTeacherUpdatePasswordPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 h-screen items-center">
      <div className="flex justify-center items-center bg-white rounded-md shadow-md pt-[24px] px-[40px] pb-[45px] w-4/6 md:w-2/5 lg:w-2/6 mx-auto">
        <div className="bg-secondary-light w-full md:w-9/9 flex flex-col gap-[30px]  ">
          <UpdatePassword
            updatePasswordSuccessLink={'/teachers/onboarding/welcome'}
          ></UpdatePassword>
        </div>
      </div>
    </div>
  );
}
