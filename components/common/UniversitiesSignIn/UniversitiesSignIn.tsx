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
import { Heading } from '../Heading';
import { Avatar } from '@/components/ui/avatar/avatar';
import { LoginCarousel } from '@/components/ui/carousel/carousel';
import { useMutation, useQueryClient } from 'react-query';
import { IAuthentication } from '@/app/api/types';
import { LoginAPI } from '@/app/api/auth';
import { toast } from 'react-toastify';
import { storeToken, storeUserId } from '@/app/utils/encryption';
import { updateToken } from '@/app/utils/http';
import { Typography } from '../Typography/Typography';
import { useEffect } from 'react';
import { useGlobalState } from '@/app/globalContext/globalContext';

interface ICarouselItems {
  title: string;
  description: string;
  imgPath: string;
}

interface IProps {
  carouselItems: ICarouselItems[];
}

const formSchema = z.object({
  name: z.string().min(2, {
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
  loginSuccessLink: string;
}

export function SignInUni(props: SignInProps) {
  const router = useRouter();
  const { isAuthenticated } = useGlobalState();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(props.loginSuccessLink);
    }
  }, [isAuthenticated]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const { mutate: userLogin, isLoading } = useMutation(
    (userData: IAuthentication) => LoginAPI(userData),
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        const response = res.data.result;
        router.push(props.loginSuccessLink);
        storeToken(response?.token);
        storeUserId(response?.user?.id);
        updateToken(response?.token);
        queryClient.refetchQueries('userInformation');
        queryClient.refetchQueries('UserJoinedCommunities');
        queryClient.refetchQueries('MyPenPals');
        queryClient.refetchQueries('get-users-i-blocked');
        reset();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit: SubmitHandler<IAuthentication> = async (
    data: IAuthentication
  ) => {
    userLogin(data);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch justify-stretch h-screen">
        <div className="hidden md:block w-full md:w-1/2 ">
          <LoginCarousel
            carouselItems={[
              {
                title: 'Empower your College',
                description:
                  'Shaping Global Citizens Through Cultural Intelligence',
                imgPath: '/assets/images/slider1.jpeg',
              },
              {
                title: 'Teach the Future',
                description:
                  'Shaping Global Citizens Through Cultural Intelligence',
                imgPath: '/assets/images/slider3.jpeg',
              },
            ]}
          />
        </div>

        <div className="w-full md:w-6/12 h-screen flex flex-col justify-center items-center ">
          <div className="flex items-center justify-center">
            <Image
              alt="logo"
              width={150}
              height={150}
              src="/assets/GCEd/NavGCEd.svg"
            />
          </div>
          <div className="text-center mb-4 mt-12">
            <Typography variant="h2" weight="semibold">
              Log in to your account
            </Typography>
            <Typography
              variant="p"
              weight="medium"
              className="text-slate-600 mt-1"
            >
              Log in to access your GCEd dashboard
            </Typography>
          </div>
          {/* <div className="flex items-center justify-center mb-2  ">
            {icons.map((icon, index) => (
              <div key={index} className="-ml-2  z-2 mb-5">
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
          </div> */}
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="College or university email"
                        {...field}
                        className="w-96"
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
                        className="text-[#5D5E68] w-96"
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
                size="md"
                className="w-96 text-white flex items-center"
                loading={isLoading}
                disabled={isLoading}
              >
                Login
              </Button>
              {/*<div className="flex justify-center py-4 sm:py-6 md:py-10 items-center">*/}
              {/*  <Separator className="text-slate-900 w-3/12 sm:w-4/12" />*/}
              {/*  <p className="text-slate-500 m-1">or</p>*/}
              {/*  <Separator className="text-slate-900 w-3/12 sm:w-4/12" />*/}
              {/*</div>*/}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
