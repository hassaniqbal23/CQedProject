'use client';
import React, { useState } from 'react';
import Progressbar from '../Progressbar/Progressbar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  Input,
  Button,
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
import { useGlobalState } from '@/app/globalContext/globalContext';
import { Typography } from '../Typography/Typography';
import MultipleSelector from '../From/MultiSelect';
import { AddEducation } from './AddEducation/AddEducation';
import { AddWorkExperience } from './AddEducation/AddWorkExperience';
import SkillsInput from '../From/SkillsInput';

interface IAboutYouProps {
  avatar: string;
  bio: string;
  skills?: string[];
}

const formSchema = z.object({
  bio: z.string().min(150, { message: 'At least 150 characters' }),
  avatar: z.string().optional(),
});

export const AboutYou: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
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
  const {
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = form;

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
  const { mutate: updateTeacher, isLoading: isCreating } = useMutation(
    (userData: IAboutYouProps) =>
      updateProfile(
        { bio: userData.bio, skills: userData?.skills as string[] },
        userInformation?.id
      ),
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        router.push('/teachers/onboarding/qualities');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );
  const handleChildData = (newSkills: string[]) => {
    setSkills(newSkills);
  };

  const onSubmit: SubmitHandler<IAboutYouProps> = async (
    data: IAboutYouProps
  ) => {
    const submitValue = {
      ...data,
      skills: skills,
    };
    updateTeacher(submitValue);
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden mb-28">
      <div className=" mx-auto">
        <div className="">
          <div className="mx-auto mt-4 md:w-96">
            <Progressbar heading={'Doing great!'} percentage={40} />
          </div>
          <div className="mx-auto w-max mt-4">
            <Typography
              variant={'h3'}
              weight={'bold'}
              className="text-center text-primary-500 pt-3"
            >
              Tell us about yourself, {userInformation.name}
            </Typography>
            <Typography
              variant={'body'}
              weight={'regular'}
              className="text-center pt-1"
            >
              Let the world get to know you
            </Typography>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-10 md:px-32 mt-8">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex justify-center flex-col items-center">
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
              <div className="pt-4">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Write about yourself</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={8}
                          placeholder="Tell us about you. What makes you smile? What is unique about you?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Add Education*/}
            </div>
          </form>
        </Form>

        <div className="px-10 md:px-32 mt-16 mb-10 ">
          <Typography
            variant={'h4'}
            weight={'bold'}
            className="text-left mb-3 text-primary-500"
          >
            Add Education
          </Typography>

          <AddEducation />
        </div>
        {/*  Add Work Experience */}

        <div className="px-10 md:px-32 mt-16 mb-10 ">
          <Typography
            variant={'h4'}
            weight={'bold'}
            className="text-left  text-primary-500"
          >
            Add Work Experience
          </Typography>

          <AddWorkExperience />
        </div>

        <div className="mt-8 mb-14 px-10 md:px-32">
          <Typography
            variant={'h4'}
            weight={'bold'}
            className="text-primary-500 mb-6"
          >
            Add Skills
          </Typography>

          <SkillsInput onTagsChange={handleChildData} BadgeVariant="outline" />
        </div>
        <div className="fixed bottom-0 w-full ">
          <BottomNavbar
            onContinue={async () => {
              const isValid = await trigger();
              if (isValid) {
                handleSubmit(onSubmit)();
              } else {
                console.log('Validation failed');
              }
            }}
            buttonLoading={isCreating}
            onBackButton={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutYou;
