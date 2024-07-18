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
import { IAuthenticationSignUP } from '@/app/api/types';
import {
  LoginRole,
  LoginWithFacebook,
  LoginWithGoogleAPI,
  signupAPI,
} from '@/app/api/auth';
import { toast } from 'react-toastify';
import { storeToken, storeUserId } from '@/app/utils/encryption';
import { updateToken } from '@/app/utils/http';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import { useEffect } from 'react';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { IoLogoFacebook } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Typography } from '@/components/common/Typography/Typography';

interface ICarouselItems {
  title: string;
  description: string;
  imgPath: string;
}

interface IProps {
  carouselItems: ICarouselItems[];
}

const formSchema = z
  .object({
    email: z.string().min(2, {
      message: 'Username must be at least 12 characters.',
    }),
    password: z.string().min(2, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
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

interface SignUpProps {
  forgetPasswordLink: string | URL;
  loginSuccessLink: string;
  loginWithGoogleORFacebook: string;
  signinLink: string | URL;
  role: LoginRole;
}

export function SignUp(props: SignUpProps) {
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
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = form;
  const { mutate: userSignUp, isLoading } = useMutation(
    (userData: IAuthenticationSignUP) => signupAPI(userData),
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

  const { mutate: userLoginWithGoogleAPI, isLoading: isGoogleLoading } =
    useMutation(
      (userData: { token: string; type: string }) =>
        LoginWithGoogleAPI(userData, props.role),
      {
        onSuccess: (res) => {
          toast.success(res.data.message);
          const response = res.data.result;
          router.push(props.loginWithGoogleORFacebook);
          storeToken(response?.token);
          storeUserId(response?.user?.id);
          updateToken(response?.token);
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

  const { mutate: userLoginWithFacebook, isLoading: isFacebookLoading } =
    useMutation(
      (userData: { token: string; type: string }) =>
        LoginWithFacebook(userData, props.role),
      {
        onSuccess: (res) => {
          toast.success(res.data.message);
          const response = res.data.result;
          router.push(props.loginWithGoogleORFacebook);
          storeToken(response?.token);
          storeUserId(response?.user?.id);
          updateToken(response?.token);
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

  const facebookLogin = (response: any) => {
    const submitValue = {
      token: response.accessToken,
      type: props?.role || '',
    };

    userLoginWithFacebook({ ...submitValue });
  };

  const onSubmit: SubmitHandler<IAuthenticationSignUP> = async (
    data: IAuthenticationSignUP,
    event: any
  ) => {
    event.preventDefault();

    const submit = {
      email: data.email,
      password: data.password,
      type: props.role,
    };
    userSignUp(submit);
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
          <Image
            src={'/icons/GCEd_logo.svg'}
            height={56}
            width={184}
            alt="GCEd Logo"
          />
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        {...field}
                        className="w-full"
                        type="email"
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
                        placeholder="password"
                        {...field}
                        className="w-full"
                        type="password"
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
                        placeholder="confirm password"
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
                href={props.signinLink}
                className="text-primary-700 font-bold text-sm ml-1"
              >
                {' '}
                Sign In
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
