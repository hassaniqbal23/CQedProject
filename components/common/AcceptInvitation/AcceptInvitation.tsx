'use client';
import React, { FC, useEffect, useState } from 'react';
import { IAcceptInvitation } from '@/app/api/types';
import { storeToken, storeUserId } from '@/app/utils/encryption';
import { updateToken } from '@/app/utils/http';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from 'react-query';
import { UserAcceptInvitation } from '@/app/api/auth';
import { AxiosError } from 'axios';

interface IProps {
  routeType: string;
}

export const AcceptInvitation: FC<IProps> = ({ routeType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useSearchParams();
  const currentToken = params?.get('token');
  const router = useRouter();

  const { mutate: userAcceptInvitation } = useMutation(
    (userData: IAcceptInvitation) => UserAcceptInvitation(userData),
    {
      onSuccess: (res) => {
        const response = res;
        setIsLoading(false);
        router.push(`/${routeType}/onboarding/create-profile`);
        storeToken(response.data?.token);
        storeUserId(response?.data?.data?.id);
        updateToken(response?.data.token);
      },
      onError: (error: AxiosError) => {
        router.push(`/${routeType}/sign-in`);
        console.log((error.response?.data as any)?.message, 'checking');
        console.log(error, 'Error =====> log');
      },
    }
  );

  useEffect(() => {
    if (currentToken) {
      const payload = {
        inviteToken: currentToken!,
      };
      userAcceptInvitation(payload);
    } else {
      setIsLoading(false);
      router.push(`/${routeType}/sign-in`);
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

  return <></>;
};
AcceptInvitation.displayName = 'AcceptInvitation';
