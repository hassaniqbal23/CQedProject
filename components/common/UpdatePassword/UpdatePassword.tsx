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
import { UpdatePasswordBody, UpdateUserPassword } from '@/app/api/auth';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  password: z.string().min(8, {
    message: 'Password should be at least 8 characters',
  }),

  confirm_password: z.string().min(8, {
    message: 'Confirm Password should be at least 8 characters',
  }),
});

export interface UpdatePasswordProps {
  updatePasswordSuccessLink: string;
}

export function UpdatePassword(props: UpdatePasswordProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const { mutate, isLoading } = useMutation(
    (data: UpdatePasswordBody) => UpdateUserPassword(data),
    {
      onSuccess: (res) => {
        router.push(props.updatePasswordSuccessLink);
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit = form.handleSubmit((values) => {
    mutate(values);
  });

  return (
    <div className="w-full">
      <div className="text-center flex flex-col mb-3">
        <h1 className="mb-2 font-bold text-3xl ">Update your password</h1>
        <p className="mb-2 text-sm font-semibold text-gray-500">
          Use a strong password to access your account
        </p>
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
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={'password'}
                      placeholder="Conform Password"
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
  );
}
