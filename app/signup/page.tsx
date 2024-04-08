'use client';
import { FC, useState } from 'react';
import { Heading } from '@/components/common/Heading';
import { SmallHeading } from '@/components/common/SmallHeading';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from 'react-icons/ai';
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
import Link from 'next/link';
import { IRegisterFrom } from '../api/types';
// import { storeToken, storeUserId } from '../utils/encryption';
// import { updateToken } from '../utils/http';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  email: z.string().email().min(5, {
    message: 'Email must be at least 5 characters',
  }),
  password: z.string().refine(
    (value) => {
      return (
        value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[!@#$%^&*()\-_+=<>?]/.test(value) &&
        /[0-9]/.test(value)
      );
    },
    {
      message:
        'Password must contain at least 8 characters long, contain at least one uppercase character, and at least one number and symbol character',
    },
  ),
  terms: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

const SignUp: FC = () => {

  const form = useForm<IRegisterFrom>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;


  const onSubmit: SubmitHandler<IRegisterFrom> = (data: IRegisterFrom) => {
    console.log(data, 'data')
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-1 h-screen">
      <div className="flex justify-end items-center">
        <div className="bg-secondary-light mx-auto w-4/12 px-2 md:px-0">
          
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Name</FormLabel>
                      <FormControl className="mb-6">
                        <Input
                          type="text"
                          placeholder="Enter your name!"
                          {...field}
                          {...register('name')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
             
              <div className="py-2 mt-2">
                <Button
                  className="bg-primary w-full"
                  type="submit"
                  disabled={!isValid}
                >
                    Create account
                </Button>
              </div>
              <div className="mt-2 sm:mt-8 mb-4">
                <div className="sm:flex sm:justify-center text-center items-baseline">
                 
                  <Link
                    href={'/login'}
                    className="text-primary hover:no-underline text-base p-0"
                  >
                    Sign-In here
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
