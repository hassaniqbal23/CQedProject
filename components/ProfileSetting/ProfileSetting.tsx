import {
  Form,
  Card,
  Textarea,
  FormItem,
  FormLabel,
  Button,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProfileImage, uploadProfileImage } from '@/app/api/admin';
import { toast } from 'sonner';
import { IUserInformation } from '@/app/globalContext/types';
import { FormInput } from '../common/From/FormInput';
import ImageUpload from '../common/ImageUpload/ImageUpload';
import MultipleSelector from '../common/From/MultiSelect';
import { Typography } from '../common/Typography/Typography';
import { AddEducation } from '../common/teacherProfile/AddEducation/AddEducation';
import { AddWorkExperience } from '../common/teacherProfile/AddEducation/AddWorkExperience';
import { userUpdateProfile } from '@/app/api/users';
import SkillsInput from '../common/From/SkillsInput';

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  nick_name: z.string().min(5, {
    message: 'Nick name must be at least 5 characters',
  }),
  photo: z.string().optional(),
  bio: z.string().optional(),
});

const ProfileSettings = () => {
  const { userInformation, isUserGetInfo } = useGlobalState();

  const [skills, setSkills] = useState<string[]>(
    userInformation?.profile?.skills.map((skill: string) => (skill)) || []
  );
  const queryClient = useQueryClient();
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: userInformation?.profile?.full_name || '',
      nick_name: userInformation?.profile?.nick_name || '',
      photo: userInformation?.attachment?.file_path || '',
      bio: userInformation?.profile?.bio || '',
      skills: userInformation.profile?.skills || [],
    },
  });

  const { mutate: deleteProfile, isLoading: isDeletingProfile } = useMutation(
    (id: number) => deleteProfileImage(id),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
        queryClient.invalidateQueries('userInformation');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const { mutate: uploadProfile, isLoading: isUploadingProfile } = useMutation(
    (file: FormData) => uploadProfileImage(file),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
        queryClient.invalidateQueries('userInformation');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const { mutate: updateTeacherProfile, isLoading: isUpdatingProfile } =
    useMutation(
      (data: { profileId: number; payload: IUserInformation }) =>
        userUpdateProfile(data.profileId, data.payload),
      {
        onSuccess: (res) => {
          toast.success('Profile updated successfully', {
            position: 'bottom-center',
          });
          queryClient.invalidateQueries('userInformation');
        },
        onError: (error: any) => {
          console.log(error, 'Error =====> log');
        },
      }
    );

  useEffect(() => {
    if (userInformation) {
      form.setValue(
        'full_name',
        userInformation.profile?.full_name || userInformation.name
      );
      form.setValue('nick_name', userInformation.profile?.nick_name);
      form.setValue('bio', userInformation.profile?.bio);
      form.setValue(
        'skills',
        userInformation.profile?.skills.map((skill: string) => ({
          value: skill,
          label: skill,
        }))
      );
    }
  }, [userInformation, form]);

  const handleValues = (newSkills: string[]) => {
    setSkills(newSkills);
  };

  const onSubmit: SubmitHandler<any> = () => {
    const formData = form.getValues();
    const payload: IUserInformation = {
      ...formData,
      skills: skills,
    };

    if (userInformation?.profile?.id) {
      updateTeacherProfile({ profileId: userInformation.profile.id, payload });
    }
  };

  return (
    <Card className="w-full p-6 mt-6">
      <Typography variant={'h3'} weight={'semibold'}>
        Basic Information
      </Typography>

      <div className="mt-8 flex flex-col items-center w-full md:w-1/3 lg:w-1/5 md:ml-0">
        <ImageUpload
          loading={isDeletingProfile || isUploadingProfile || isUserGetInfo}
          attachmentFilepath={userInformation?.attachment?.file_path}
          attachmentID={userInformation?.attachment?.id}
          deleteProfile={deleteProfile}
          uploadProfile={uploadProfile}
        />
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5 mt-8">
              <FormInput
                label="Full Name"
                form={form}
                name="full_name"
                placeholder={'john doe'}
              />
              <FormInput
                label="Nick Name"
                form={form}
                name="nick_name"
                placeholder={'johndoe'}
              />
            </div>
            <div className="grid grid-rows gap-1 my-4">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="!text-md">
                      Write about yourself
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself! What makes you unique?"
                        className="h-[130px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <div className=" mt-10 ">
          <Typography
            variant={'h4'}
            weight={'bold'}
            className="text-left mb-3 text-primary-500"
          >
            Add Education
          </Typography>

          <AddEducation />
        </div>
        <div className="grid mt-10">
          <Typography
            variant={'h4'}
            weight={'bold'}
            className="text-left text-primary-500 mb-3"
          >
            Add Work Experience
          </Typography>

          <AddWorkExperience />
        </div>
        <div className="grid mt-10">
          <Typography
            variant={'h4'}
            weight={'bold'}
            className="text-primary-500 mb-4"
          >
            Add Skills
          </Typography>
          <Typography variant={'h6'} weight={'semibold'} className="mb-1">
            Skills
          </Typography>
          <SkillsInput initialTags={skills} onTagsChange={handleValues} BadgeVariant="outline" />
        </div>
        <div className='mt-6'>
          <Button
            loading={isUpdatingProfile}
            className="text-md my-4 rounded-md px-9 hover:bg-primary-600"
            onClick={async () => {
              const isValid = await form.trigger();
              if (isValid) {
                form.handleSubmit(onSubmit)();
              } else {
                console.error('Validation failed');
              }
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSettings;
