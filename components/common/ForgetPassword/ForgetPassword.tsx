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
import { Typography } from '../Typography/Typography';

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => value.trim() !== '', {
      message: 'Invalid email!.',
    }),
});

interface ForgetPasswordProp {
  onClick: () => void;
  isLoadingButton?: boolean;
  onSubmit?: (values: { email: string }) => void;
}

export function ForgetPassword(props: ForgetPasswordProp) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (props.onSubmit) props.onSubmit(values);
  });

  return (
    <div className="w-full flex flex-col shrink">
      <div className="text-center flex flex-col ">
        <Typography variant="h3" weight="semibold" className="mb-2 ">
          Forget password
        </Typography>
        <Typography
          variant="p"
          weight="medium"
          className="mb-5  text-secondary-foreground"
        >
          No worries, We will send you reset instructions
        </Typography>
      </div>
      <div className="">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="font-semibold"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-col gap-4 items-center justify-center">
              <Button
                loading={props?.isLoadingButton}
                type="submit"
                variant={'default'}
                className="w-full"
              >
                Reset Password
              </Button>
              <div
                onClick={props.onClick}
                className=" text-center font-montserrat font-medium text-lg cursor-pointer flex items-center text-[#4146B8]"
              >
                <ChevronLeft className="text-[#4146B8] mr-3" />
                Back
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
