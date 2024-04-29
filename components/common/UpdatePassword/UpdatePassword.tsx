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
  FormLabel,
  FormMessage,
} from '@/components/ui';

const formSchema = z.object({
  password: z.string().min(8, {
    message: 'Password should be at least 8 characters',
  }),

  confirmPassword: z.string().min(8, {
    message: 'Confirm Password should be at least 8 characters',
  })
});

export function UpdatePassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
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
                        type={"password"}
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                        type={"password"}
                      placeholder="Conform Password"
                      {...field}
                      className="font-semibold"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
              <Button type="submit" variant={'default'} className="w-full mt-4">
                Continue
              </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
