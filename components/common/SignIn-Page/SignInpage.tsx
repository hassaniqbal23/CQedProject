// components/ProfileForm.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import Image from 'next/image';
import Link from 'next/link';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui';
import { Separator } from '@/components/ui/separator/separator';
import { Avatar } from '@/components/ui/avatar/avatar';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 12 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 8 characters',
  }),
});

const icons = [
  '/assets/images/Ellipse 1.svg',
  '/assets/images/Ellipse 2.svg',
  '/assets/images/Ellipse 3.svg',
  '/assets/images/Ellipse 4.svg',
  '/assets/images/Ellipse 5.svg',
  '/assets/images/Ellipse 6.svg',
  '/assets/images/Ellipse 7.svg',
  '/assets/images/Ellipse 8.svg',
  '/assets/images/Ellipse 9.svg',
];

interface SignInProps {
  forgetPasswordLink: string | URL;
}

export function SignIn(props: SignInProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    // Do something with the form values.
    console.log(values);
  });

  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch justify-stretch h-screen">
        <div className="w-full md:w-6/12 h-full schools-login-image pl-4 hidden md:flex flex-col m-auto">
          <h1 className="text-white font-bold text-3xl mt-auto overflow-hidden ">
            Teach the Future
          </h1>
          <p className="text-white mb-16 ">
            Shaping Global Citizens Through Cultural Intelligence
          </p>
        </div>
        <div className="w-full md:w-6/12 h-screen flex flex-col justify-center items-center ">
          <div className="text-center mb-4 mt-12">
            <h1 className="font-bold text-3xl">Sign in to your account</h1>
            <h4 className="text-slate-600  text-base mt-1 font-semibold">
              Sign in to access your account
            </h4>
          </div>
          <div className="flex items-center justify-center mb-2  ">
            {icons.map((icon, index) => (
              <div key={index} className="-ml-2  z-2 ">
                <Avatar className="h-6 w-6">
                  <Image
                    src={icon}
                    alt={`Ellipse ${index + 1}`}
                    width={100}
                    height={100}
                  />
                </Avatar>
              </div>
            ))}
          </div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8 ">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Moin Haikal"
                        {...field}
                        className="w-[300px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        className="text-[#5D5E68] w-[300px]"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                href={props.forgetPasswordLink}
                className="text-sm text-primary hover:no-underline p-0 flex justify-end font-semibold"
              >
                Forget your password?
              </Link>
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="w-[300px] text-white flex items-center"
              >
                Login
              </Button>
              <div className="flex justify-center py-4 sm:py-6 md:py-10 items-center">
                <Separator className="text-slate-900 w-3/12 sm:w-4/12" />
                <p className="text-slate-500 m-1">or</p>
                <Separator className="text-slate-900 w-3/12 sm:w-4/12" />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
