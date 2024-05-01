'use client';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IAuthentication } from '../api/types';
import { getAccessToken, storeToken, storeUserId } from '../utils/encryption';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { FormInput } from '@/components/common/From/FormInput';
import { updateToken } from '../utils/http';
import { LoginAPI } from '../api/auth';
import { useMutation } from 'react-query';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 3 characters',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  remember: z.boolean(),
});

export default function Login() {
  const router = useRouter();

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
        router.push('/dashboard');
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
            <Image alt="logo" width={150} height={150} src="/logo.svg" />
          </div>
          <div className="text-center mb-0">
            <h1 className="font-bold text-center text-lg mb-1 md:text-xl ">
              Login
            </h1>
            <p className="text-center text-sm font-semibold">
              Login to your admin account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="font-semibold">Username</label>
                <FormInput
                  required={true}
                  form={form}
                  name="name"
                  placeholder={'admin'}
                />
              </div>
              <div className="mb-3">
                <div>
                  <label className="font-semibold">Password</label>
                  <FormInput
                    type="password"
                    form={form}
                    name="password"
                    placeholder={'Enter your password'}
                  />
                </div>
              </div>
              <div className="py-2 ">
                <Button
                  className=" w-full disabled:invalid:cursor-pointer hover:disabled:cursor-not-allowed"
                  type="submit"
                  size={'lg'}
                  loading={isLoading}
                  disabled={isLoading || !isValid}
                  variant={'primary400'}
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
