'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import {
  AcceptTeacherInvitation,
  IAcceptTeacherInvitation,
} from '@/app/api/teachers';
import { storeToken, storeUserId } from '@/app/utils/encryption';
import { updateToken } from '@/app/utils/http';
import { useRouter } from 'next/navigation';

export default function TeacherAcceptInvite({
  params: { id },
}: {
  params: { id: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const params = useSearchParams();
  const currentToken = params?.get('token');
  const userType = params?.get('type');
  const router = useRouter();

  const { mutate: acceptTeacherInvitation, isLoading: isAcceptingEmail } =
    useMutation(
      (userData: IAcceptTeacherInvitation) => AcceptTeacherInvitation(userData),
      {
        onSuccess: (res) => {
          toast.success(res.data.message);
          const response = res;
          setIsLoading(false);
          router.push('/teachers/onboarding/create-profile');
          storeToken(response.data?.token);
          storeUserId(response?.data?.data?.id);
          updateToken(response?.data.token);
        },
        onError: (error: any) => {
          console.log(error, 'Error =====> log');
        },
      }
    );

  useEffect(() => {
    if (currentToken && userType) {
      const payload = {
        inviteToken: currentToken!,
        type: userType,
      };
      acceptTeacherInvitation(payload);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row justify-center items-center h-screen">
        <Loader2 className="mr-0 md:mr-2 h-10 w-10 animate-spin text-primary text-5xl text-centers" />
        <span className="flex items-center text-center text-foreground text-3xl">
          Please wait for verifying your account ...
        </span>
      </div>
    );
  }

  return;
}

TeacherAcceptInvite.showLayout = false;
