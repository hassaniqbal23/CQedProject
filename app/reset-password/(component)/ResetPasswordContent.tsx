'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui';
import { useMutation } from 'react-query';
import { UserResetPassword } from '@/app/api/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { IResetPassword } from '@/app/api/types';
import { Typography } from '@/components/common/Typography/Typography';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password should be at least 8 characters',
    }),
    newPassword: z.string().min(8, {
      message: 'New Password should be at least 8 characters',
    }),
  })
  .refine((data) => data.password === data.newPassword, {
    message: 'Passwords must match',
    path: ['newPassword'],
  });

export const ResetPasswordContent = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params?.get('code');
  const [currentType, setCurrentType] = useState<null | string>(null);

  useEffect(() => {
    if (token) {
      try {
        const decodeType = Buffer.from(token, 'base64').toString('utf-8');
        if (decodeType) {
          const currentType = JSON.parse(decodeType).type;
          setCurrentType(currentType);
        } else {
          console.error('Decoded string is empty');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      toast.warning('Token is missing', {
        position: 'bottom-center',
      });
      router.push('/login');
    }
  }, [token]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  const { mutate, isLoading } = useMutation(
    (data: IResetPassword) => UserResetPassword(data),
    {
      onSuccess: (res) => {
        if (currentType === 'school') {
          router.push('/universities/sign-in ');
        } else if (currentType === 'admin') {
          router.push('/login');
        } else if (currentType === 'student') {
          router.push('/students/sign-in');
        } else if (currentType === 'teacher') {
          router.push('/teachers/sign-in');
        }
        form.reset();
      },
      onError: (error) => {
        console.error(error, 'Error =====> log');
      },
    }
  );

  const onSubmit = form.handleSubmit((values) => {
    const submit = {
      code: token || '',
      ...values,
    };
    mutate(submit);
  });

  return (
    <div className="h-screen bg-[#EEF3FE] grid grid-cols-1   items-center">
      <div className="flex justify-center items-center bg-white rounded-md shadow-md pt-8 md:pt-12 px-4 md:px-6 pb-10 md:pb-12 w-11/12 md:w-5/6 lg:w-2/3 xl:w-1/3 mx-auto">
        <div className="w-full">
          <div className="text-center flex flex-col mb-3">
            <Typography variant="h2" weight="semibold" className="mb-2 ">
              Reset your password
            </Typography>
            <Typography
              variant="body"
              weight="medium"
              className="mb-2  text-gray-500"
            >
              Use a strong password to access your account
            </Typography>
          </div>
          <div className="">
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={'password'}
                          placeholder="New Password"
                          {...field}
                          className="font-semibold"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={'password'}
                          placeholder="New Password"
                          {...field}
                          className="font-semibold"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant={'default'}
                  className="w-full mt-4"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Continue
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
