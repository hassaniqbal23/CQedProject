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
import { useModule } from '@/components/ModuleProvider/ModuleProvider';

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

export function SignIn(props: SignInProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { module } = useModule();

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
    <div className="flex flex-col md:flex-row items-stretch justify-stretch min-h-screen">
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

      <div className="w-full md:w-1/2 m-auto flex flex-col justify-center items-center p-6 md:p-12">
        <div className="text-center mb-4 mt-12 px-4">
          <Typography variant="h2" weight="semibold">
            Sign in to your account
          </Typography>
          <Typography
            variant="p"
            weight="medium"
            className="text-slate-600 mt-1"
          >
            Sign in to access your account
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
      </div>
    </div>
  );
}
