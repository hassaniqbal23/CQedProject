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
import { Separator } from '@/components/ui/separator';
import { SignupAPI } from '../api/auth';
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
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<IRegisterFrom>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const { mutate: userRegister, isLoading } = useMutation(
    (userData: any) => SignupAPI(userData),
    {
      onSuccess: (res) => {
        // storeToken(response?.token);
        // storeUserId(response?.user?.id);
        // updateToken(response?.token);
        router.push('/dashboard/main');
        reset();
      },
      onError: (error: any) => {
       console.log(error, 'error')
      },
    },
  );

  const onSubmit: SubmitHandler<IRegisterFrom> = (data: IRegisterFrom) => {
    userRegister(data);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-1 h-screen">
      <div className="flex justify-end items-center">
        <div className="bg-secondary-light mx-auto w-4/12 px-2 md:px-0">
          <Heading
            className="text-center sm:text-left"
            text="Create an account"
          />
          <Heading
            className="text-center sm:text-left text-slate-600 mt-2"
            text="Let’s get started with your new account"
            fontWeight="font-normal"
            fontSize="text-base"
          />
          <SmallHeading
            className="text-center sm:text-left text-slate-700 mt-8"
            text="Sign up with"
          />
       
          <div className="flex justify-between py-4 sm:py-6 md:py-10 items-center">
            <Separator className="text-slate-900 w-3/12 sm:w-3/12" />
            <SmallHeading
              className="mx-1 text-center text-slate-500"
              text="Or continue with"
            />
            <Separator className="text-slate-900 w-3/12 sm:w-3/12" />
          </div>
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
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Email</FormLabel>
                      <FormControl className="mb-6">
                        <Input
                          type="email"
                          placeholder="Enter your email!"
                          {...field}
                          {...register('email')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Password</FormLabel>
                      <FormControl className="mb-6">
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password!"
                            {...field}
                            {...register('password')}
                          />
                          <p
                            className="absolute right-3 top-1 mt-2 rounded-full text-[#6C7280] hover:cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </p>
                        </div>
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
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </span>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </div>
              <div className="mt-10 sm:mt-20 mb-4">
                <div className="sm:flex sm:justify-center text-center items-baseline">
                  <Heading
                    text="Already have an Account?"
                    className="text-slate-600 mr-1"
                    fontSize="text-base"
                    fontWeight="font-normal"
                  />
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
