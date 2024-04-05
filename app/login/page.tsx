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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { updateToken } from '../utils/http';
import { useMutation } from 'react-query';

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
      name:  '',
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
        router.push('/dashboard/main');
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
    <div className="grid grid-cols-1 md:grid-cols-1 h-screen items-center">
      <div className="flex justify-end items-center">
        <div className="bg-secondary-light mx-auto w-4/12 px-2 md:px-0">
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
                        Email Address or Username
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
              <div className="mb-[18px]">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Password</FormLabel>
                      <FormControl className="mb-6">
                        <Input
                          type="password"
                          placeholder="Enter your Password!"
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
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </div>
             
            </form>
          </Form>
        </div>
      </div>
     
    </div>
  );
}
