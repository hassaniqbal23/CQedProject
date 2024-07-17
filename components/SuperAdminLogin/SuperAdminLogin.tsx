'use client';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, Label } from '@/components/ui';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { FormInput } from '@/components/common/From/FormInput';
import { useMutation, useQueryClient } from 'react-query';
import Link from 'next/link';
import { Typography } from '@/components/common/Typography/Typography';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { LoginAPI } from '@/app/api/auth';
import { IAuthentication } from '@/app/api/types';
import {
  getAccessToken,
  storeToken,
  storeUserId,
} from '@/app/utils/encryption';
import { updateToken } from '@/app/utils/http';
import axios from 'axios';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 3 characters',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  remember: z.boolean(),
});

export default function SuperAdminLogin() {
  const router = useRouter();
  const { isAuthenticated } = useGlobalState();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAuthenticated) {
        router.push('/admin/dashboard');
      } else {
        localStorage.clear();
      }
    }
  }, [isAuthenticated, router]);

  const form = useForm<IAuthentication>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      remember: false,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const isLoginUser = getAccessToken();
      if (isLoginUser) {
        router.push('/admin/dashboard');
      }
    };
    checkUserAuthentication();
  }, [router]);

  const { mutate: userLogin, isLoading } = useMutation(
    (userData: IAuthentication) => LoginAPI(userData),
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        const response = res.data.result;
        router.push('/admin/dashboard');
        storeToken(response?.token);
        storeUserId(response?.user?.id);
        updateToken(response?.token);
        axios.post('/api/login', {
          token: response?.token,
        });

        queryClient.refetchQueries('userInformation');
        queryClient.refetchQueries('UserJoinedCommunities');
        queryClient.refetchQueries('MyPenPals');
        queryClient.refetchQueries('get-users-i-blocked');
        reset();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit: SubmitHandler<IAuthentication> = async (
    data: IAuthentication
  ) => {
    userLogin(data);
  };

  return (
    <div className="h-screen bg-[#EEF3FE] grid grid-cols-1   items-center">
      <div className="flex justify-center items-center bg-white rounded-md shadow-md pt-8 md:pt-12 px-4 md:px-6 pb-10 md:pb-12 w-11/12 md:w-5/6 lg:w-2/3 xl:w-1/3 mx-auto">
        <div className="bg-secondary-light w-full md:w-10/12  flex flex-col gap-[30px]  ">
          <div className="flex items-center justify-center">
            <Image
              alt="logo"
              width={150}
              height={150}
              src="/assets/GCEd/NavGCEd.svg"
            />
          </div>
          <div className="text-center mb-0">
            <Typography
              className=" text-center text-lg mb-1 md:text-xl "
              variant={'h1'}
              weight={'semibold'}
            >
              Admin Login
            </Typography>
            <Typography
              variant={'p'}
              weight={'regular'}
              className="text-center text-[#282931] "
            >
              Log in to manage your GCEd admin panel
            </Typography>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <Label>Username</Label>
                <FormInput
                  required={true}
                  form={form}
                  name="name"
                  placeholder={'Enter your username'}
                />
              </div>
              <div className="mb-3">
                <div>
                  <Label>Password</Label>
                  <FormInput
                    type="password"
                    form={form}
                    name="password"
                    placeholder={'Enter your password'}
                  />
                </div>
              </div>
              <div className="py-2 ">
                <Link
                  href={'/admin/forgot-password'}
                  className="text-sm text-primary hover:no-underline p-0 flex justify-end font-semibold mb-4"
                >
                  Forget your password?
                </Link>
                <Button
                  className=" w-full disabled:invalid:cursor-pointer hover:disabled:cursor-not-allowed"
                  type="submit"
                  size={'lg'}
                  loading={isLoading}
                  disabled={isLoading || !isValid}
                  variant={'primary500'}
                >
                  Log in
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
