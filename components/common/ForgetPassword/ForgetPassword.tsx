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
import { ChevronLeft } from 'lucide-react';

const formSchema = z.object({
  emailAddress: z
    .string()
    .email()
    .refine((value) => value.trim() !== '', {
      message: 'Invalid email!.',
    }),
});

interface ForgetPasswordProp {
  onClick: () => void;
}

export function ForgetPassword(props: ForgetPasswordProp) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <div className="w-full flex flex-col shrink">
      <div className="text-center flex flex-col ">
        <h1 className="mb-2 font-bold text-3xl ">Forget password</h1>
        <p className="mb-2 text-sm font-semibold text-gray-500">
          No worries, We will send you reset instructions.
        </p>
      </div>
      <div className="w-[500px] ">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your email"
                      {...field}
                      className="font-semibold"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-col gap-4 items-center justify-center">
              <Button type="submit" variant={'default'} className="w-full">
                Reset Password
              </Button>
              <div
                onClick={props.onClick}
                className=" text-center font-montserrat font-medium text-lg cursor-pointer flex items-center text-[#4146B8] "
              >
                <ChevronLeft className="text-[#4146B8]" />
                Back
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
