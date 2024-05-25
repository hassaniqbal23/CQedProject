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
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { updateProfile } from '@/app/api/teachers';
import { deleteProfileImage, uploadProfileImage } from '@/app/api/admin';
import ImageUpload from '../ImageUpload/ImageUpload';
import { useGlobalState } from '@/app/gobalContext/globalContext';

interface IAboutYouProps {
  avatar: string;
  bio: string;
}

const formSchema = z.object({
  bio: z.string().min(10).nonempty('Bio is required'),
  avatar: z.string().optional(),
});

export const AboutYou: React.FC = () => {
  const { userInformation, isUserGetInfo } = useGlobalState();
  const refetch = useQueryClient();
  const router = useRouter();
  const form = useForm<IAboutYouProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: '',
      bio: '',
    },
  });
  const { handleSubmit } = form;

  const { mutate: uploadProfile, isLoading: isUploadingProfile } = useMutation(
    (file: FormData) => uploadProfileImage(file),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
        refetch.invalidateQueries('userInformation');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const { mutate: deleteProfile, isLoading: isDeletingProfile } = useMutation(
    (id: number) => deleteProfileImage(id),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
        refetch.invalidateQueries('userInformation');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const { mutate: createTeacher, isLoading: isCreating } = useMutation(
    (userData: IAboutYouProps) => updateProfile({ bio: userData.bio }),
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        router.push('/teachers/onboarding/update-password');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit: SubmitHandler<IAboutYouProps> = async (
    data: IAboutYouProps
  ) => {
    createTeacher(data);
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className=" p-4 mx-auto ">
        <div className="">
          <div className="mx-auto mt-4 md:w-96">
            <Progressbar heading={'We are almost there'} percentage={75} />
          </div>
          <div className="mx-auto w-max mt-4">
            <h1 className="text-primary-500 text-2xl font-mono text-center pt-3 not-italic font-bold leading-10">
              About You
            </h1>
            <p>Tell us about yourself!</p>
          </div>
        </div>

        <div className="px-10 md:px20 mt-8">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex justify-center flex-col items-center w-full">
                    <FormControl>
                      <ImageUpload
                        loading={
                          isDeletingProfile ||
                          isUploadingProfile ||
                          isUserGetInfo
                        }
                        deleteProfile={deleteProfile}
                        uploadProfile={uploadProfile}
                        attachmentID={userInformation?.attachment?.id}
                        attachmentFilepath={
                          userInformation?.attachment?.file_path
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-20 w-9/12 mx-auto pb-24">
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
                  buttonLoading={isCreating}
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
