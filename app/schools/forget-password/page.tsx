'use client';

import { UserForgetPassword } from '@/app/api/auth';
import { ForgetPassword } from '@/components/common/ForgetPassword/ForgetPassword';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

export default function SchoolForgetPassword() {
  const router = useRouter();

  const { mutate: UserForgetPasswordApi, isLoading } = useMutation(
    (data: { email: string }) => UserForgetPassword(data),
    {
      onSuccess: (res) => {
        console.log(res.data, 'report ');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  return (
    <>
      <div className="w-full h-screen">
        <TopNavbar showLogout={false}></TopNavbar>
        <div className="max-w-md mx-auto flex justify-center items-center h-[80vh] p-2 ">
          <ForgetPassword
            onSubmit={(value) => {
              // if (value) {
              //   UserForgetPasswordApi(value);
              // }
              router.push('/schools/forget-password/email-sent');
            }}
            onClick={() => router.back()}
          ></ForgetPassword>
        </div>
      </div>
    </>
  );
}
