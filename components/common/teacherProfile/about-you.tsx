'use client';
import React from 'react';
import TopNavbar from '../navbar/TopNavbar';
import Progressbar from '../Progressbar/Progressbar';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components/ui';
import BottomNavbar from '../navbar/bottomNavbar';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Camera, CircleUser } from 'lucide-react';

interface IAboutYouProps {
  avatar: string;
  bio: string;
}

const formSchema = z.object({
  bio: z.string().min(2).max(50).nonempty('Bio is required'),
  avatar: z.string().optional(),
});

export const AboutYou: React.FC = () => {
  const router = useRouter();
  const form = useForm<IAboutYouProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: '',
      bio: '',
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  // const { mutate: createTeacher, isLoading: isCreating } = useMutation(
  //   (userData: IAboutYouProps) => TeacherCreate(userData),
  //   {
  //     onSuccess: (res) => {
  //       toast.success(res.data.message);
  //       router.push('/teachers/onboarding/about-you');
  //     },
  //     onError: (error: any) => {
  //       console.log(error, 'Error =====> log');
  //     },
  //   }
  // );

  const onSubmit: SubmitHandler<IAboutYouProps> = async (
    data: IAboutYouProps
  ) => {
    router.push('/teachers/onboarding/update-password');
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <TopNavbar
        onLogout={() => console.log('logout')}
        className="fixed top-0 w-full z-50 "
      />

      <div className=" p-4 mx-auto ">
        <div className="">
          <div className="mx-auto mt-4 md:w-96">
            <Progressbar heading={'We are almost there'} percentage={75} />
          </div>
          <div className="mx-auto w-max mt-4">
            <h1 className="text-[#4146B8] text-2xl font-mono text-center pt-3 not-italic font-bold leading-10">
              About You
            </h1>
            <p>Tell us about yourself!</p>
          </div>
        </div>

        <div className="px-20 mt-8">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex justify-center flex-col items-center w-full">
                    <FormControl>
                      <div className="">
                        <div className="p-2 w-40 h-40 flex items-center justify-center border-dashed relative border border-success rounded-full">
                          <CircleUser />
                          <div className="absolute p-2 bg-white border right-1 bottom-0 rounded-full cursor-pointer">
                            <Camera />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormLabel>Choose your avatar</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-20 w-9/12 mx-auto">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Write about yourself</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={8}
                          placeholder="Tell us about you. What makes you smile! What is unique about you?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="fixed bottom-0 w-full z-50 left-0">
                <BottomNavbar
                  buttonType="submit"
                  buttonLoading={false}
                  onContinue={() => console.log('checking')}
                  onBackButton={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
