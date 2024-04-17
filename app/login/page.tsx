'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IAuthentication } from '../api/types';
import { LoginAPI } from '../api/auth';
import { getAccessToken, storeToken, storeUserId } from '../utils/encryption';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { updateToken } from '../utils/http';
import { useMutation } from 'react-query';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  remember: z.boolean(),
});

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
    register,
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
        toast.success('Login Successful, redirecting...');
        const response = res.data.result;
        router.push('/dashboard');
        storeToken(response?.token);
        storeUserId(response?.user?.id);
        updateToken(response?.token);
        reset();

      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log')
      },
    },
  );

  const onSubmit: SubmitHandler<IAuthentication> = async (
    data: IAuthentication,
  ) => {
    userLogin(data);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-1 h-screen items-center bg-[#EEF3FE]">
      <div className="flex justify-center items-center bg-white rounded-md shadow-md pt-[24px] px-[40px] pb-[45px] w-1/2 mx-auto">
        <div className="bg-secondary-light w-10/12 flex flex-col gap-[30px]  ">
          <div className='flex items-center justify-center' >
            <Image alt='logo' width={150} height={150} src='/logo.svg' />
          </div>
          <div className='text-center' >
            <h1 className='font-semibold text-lg' >Login</h1>
            <p>login to your admin account</p></div>
          <Form  {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)(e);
              }}
            >
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">
                        Username
                      </FormLabel>
                      <FormControl className="mb-6">
                        <Input
                          placeholder="Enter your Email or Username!"
                          {...field}
                          {...register('name')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {error && (
                <div>
                  <FormMessage>{error}</FormMessage>
                </div>
              )}
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">
                        Password
                      </FormLabel>
                      <FormControl className="mb-6">
                        <Input
                          placeholder="Enter your password!"
                          type='password'
                          {...field}
                          {...register('password')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {error && (
                <div>
                  <FormMessage>{error}</FormMessage>
                </div>
              )}
              <div className="py-2 mt-2">
                <Button
                  className="bg-primary w-full disabled:invalid:cursor-pointer hover:disabled:cursor-not-allowed"
                  type="submit"
                  size={'lg'}
                  disabled={isLoading || !isValid}
                >
                  Sign In
                </Button>
              </div>

            </form>
          </Form>
        </div>
      </div>

    </div>
  );
}
