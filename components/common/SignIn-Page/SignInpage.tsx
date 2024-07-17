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
  Separator,
} from '@/components/ui';
import { Avatar } from '@/components/ui/avatar/avatar';
import { LoginCarousel } from '@/components/ui/carousel/carousel';
import { useMutation, useQueryClient } from 'react-query';
import { IAuthentication } from '@/app/api/types';
import {
  LoginAPI,
  LoginWithGoogleAPI,
  LoginWithFacebook,
  LoginRole,
} from '@/app/api/auth';
import { toast } from 'react-toastify';
import { storeToken, storeUserId } from '@/app/utils/encryption';
import http, { updateToken } from '@/app/utils/http';
import { Typography } from '../Typography/Typography';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import { useEffect } from 'react';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { IoLogoFacebook } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import axios from 'axios';

interface ICarouselItems {
  title: string;
  description: string;
  imgPath: string;
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
  role: LoginRole;
}

export function SignIn(props: SignInProps) {
  const router = useRouter();
  const { isAuthenticated } = useGlobalState();
  const queryClient = useQueryClient();
  const { module } = useModule();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAuthenticated) {
        router.push(props.loginSuccessLink);
      } else {
        localStorage.clear();
      }
    }
  }, [isAuthenticated, router]);

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
    (userData: IAuthentication) => LoginAPI(userData, props.role),
    {
      onSuccess: async (res) => {
        toast.success(res.data.message);
        const response = res.data.result;
        router.push(props.loginSuccessLink);
        storeToken(response?.token);
        storeUserId(response?.user?.id);
        updateToken(response?.token);
        await axios.post('/api/login', {
          token: response?.token,
        });
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

  const { mutate: userLoginWithGoogleAPI, isLoading: isGoogleLoading } =
    useMutation(
      (userData: { token: string; type: string }) =>
        LoginWithGoogleAPI(userData),
      {
        onSuccess: async (res) => {
          toast.success(res.data.message);
          const response = res.data.result;
          router.push(props.loginSuccessLink);
          storeToken(response?.token);
          storeUserId(response?.user?.id);
          updateToken(response?.token);
          await axios.post('/api/login', {
            token: response?.token,
          });
          queryClient.refetchQueries('userInformation');
          queryClient.refetchQueries('UserJoinedCommunities');
          queryClient.refetchQueries('MyPenPals');
          queryClient.refetchQueries('get-users-i-blocked');
        },
        onError: (error: any) => {
          console.log(error, 'Error =====> log');
        },
      }
    );

  const { mutate: userLoginWithFacebook, isLoading: isFacebookLoading } =
    useMutation(
      (userData: { token: string; type: string }) =>
        LoginWithFacebook(userData),
      {
        onSuccess: async (res) => {
          console.log({ res });
          toast.success(res.data.message);
          const response = res.data.result;
          console.log({ response: response?.token });
          router.push(props.loginSuccessLink);
          storeToken(response?.token);
          storeUserId(response?.user?.id);
          updateToken(response?.token);
          await axios.post('/api/login', {
            token: response?.token,
          });
          queryClient.refetchQueries('userInformation');
          queryClient.refetchQueries('UserJoinedCommunities');
          queryClient.refetchQueries('MyPenPals');
          queryClient.refetchQueries('get-users-i-blocked');
        },
        onError: (error: any) => {
          console.log(error, 'Error =====> log');
        },
      }
    );

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const submitValue = {
        token: tokenResponse.access_token,
        type: props?.role || '',
      };

      userLoginWithGoogleAPI({ ...submitValue });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const facebookLogin = (response: any) => {
    const submitValue = {
      token: response.accessToken,
      type: props?.role || '',
    };

    userLoginWithFacebook({ ...submitValue });
  };

  const onSubmit: SubmitHandler<IAuthentication> = async (
    data: IAuthentication,
    event: any
  ) => {
    event.preventDefault();
    userLogin(data);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch justify-stretch min-h-screen ">
        <div className="hidden md:block w-full md:w-1/2">
          <LoginCarousel
            carouselItems={[
              {
                title: 'Teach the Future',
                description:
                  'Shaping Global Citizens Through Cultural Intelligence',
                imgPath: '/assets/images/LoginPage.png',
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

        <div className="w-full md:w-1/2 m-auto flex flex-col justify-center items-center p- md:p-1 md:mb-0 relative">
          <div className="text-center mb-4 mt-12 px-4">
            <Typography variant="h2" weight="semibold">
              Welcome to your Global Community{' '}
            </Typography>
            <Typography
              variant="p"
              weight="medium"
              className="text-slate-600 mt-1"
            >
              Your Gateway to Global Competence
            </Typography>
          </div>
          <div className="flex items-center justify-center mb-2">
            {icons.map((icon, index) => (
              <div key={index} className="-ml-2 z-2 mb-5">
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 w-full max-w-md px-4 md:px-0"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={
                          module === 'teachers'
                            ? 'Teacher ID or University Email'
                            : 'Student ID or College Email'
                        }
                        {...field}
                        className="w-full"
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
                        className="w-full"
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
                className="w-full text-white flex items-center"
                loading={isLoading}
                disabled={isLoading}
              >
                Login
              </Button>
            </form>
          </Form>
          <div className="w-full max-w-md flex flex-col items-center mt-4  md:pb-16 relative">
            <div className="flex justify-center items-center w-full overflow-hidden">
              <Separator className="w-1/2" />
              <Typography variant="p" weight="medium" className="px-2">
                Or
              </Typography>
              <Separator className="w-1/2" />
            </div>
            <div className="p-4 md:p-0 md:flex gap-2 mt-4 w-full ">
              <Button
                type="button"
                size="md"
                variant="outline"
                loading={isGoogleLoading}
                onClick={() => googleLogin()}
                className="w-full flex-1 flex items-center justify-center px-0"
              >
                <FcGoogle className="mr-2" />
                Google
              </Button>
              <FacebookLogin
                className="w-full flex-1 flex items-center justify-center"
                children={
                  <Button
                    className="mt-2 md:mt-0 flex w-full items-center justify-center"
                    type="button"
                    variant="outline"
                    loading={isFacebookLoading}
                    size="md"
                  >
                    <IoLogoFacebook className="mr-2" />
                    Facebook
                  </Button>
                }
                appId={process?.env?.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}
                onSuccess={(response) => {
                  facebookLogin(response);
                }}
              />
            </div>
            <Typography
              variant="p"
              weight="medium"
              className="flex justify-center items-center text-[#060606] mt-4 pb-12 pt-2"
            >
              Don’t have an Account?
              <Link
                href="#"
                className="text-primary-700 font-bold text-sm ml-1"
              >
                {' '}
                Sign Up
              </Link>
            </Typography>
          </div>
          <div className="flex items-end pb-2">
            <p className=" text-center text-[10px]">
              By clicking continue to join or sign in, you agree to GCEPortal{' '}
              <br />{' '}
              <Link href="#" className="text-primary">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-primary">
                Privacy Policy
              </Link>{' '}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
