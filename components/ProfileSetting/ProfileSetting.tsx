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
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProfileImage, uploadProfileImage } from '@/app/api/admin';
import { toast } from 'sonner';
import { teacherUpdateProfile } from '@/app/api/teachers';
import { IUserInformation } from '@/app/globalContext/types';
import { FormInput } from '../common/From/FormInput';
import ImageUpload from '../common/ImageUpload/ImageUpload';
import MultipleSelector from '../common/From/MultiSelect';

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  nick_name: z.string().min(5, {
    message: 'nick must be at least 5 characters',
  }),
  photo: z.string().optional(),
  bio: z.string().optional(),
});

const ProfileSettings = () => {
  const { userInformation, isUserGetInfo } = useGlobalState();
  const queryClient = useQueryClient();
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: userInformation?.profile?.full_name || '',
      nick_name: userInformation?.profile?.nick_name || '',
      photo: userInformation?.attachment?.file_path || '',
      bio: userInformation?.profile?.bio || '',
      skills:
        userInformation.profile?.skills.map((skill: string) => ({
          value: skill,
          label: skill,
        })) || [],
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
        teacherUpdateProfile(data.profileId, data.payload),
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
        'fullname',
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

  const onSubmitt: SubmitHandler<any> = () => {
    const formData = form.getValues();
    const transformedSkills = formData.skills.map(
      (skill: { value: string }) => skill.value
    );

    const payload: IUserInformation = {
      ...formData,
      skills: transformedSkills,
    };

    if (userInformation?.profile?.id) {
      updateTeacherProfile({ profileId: userInformation.profile.id, payload });
    }
  };

  return (
    <Card className="w-full p-4 mt-6">
      <h1 className="text-xl font-semibold">Basic Information</h1>
      <div className="mt-8 flex flex-col items-center w-1/5">
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
          <form onSubmit={form.handleSubmit(onSubmitt)}>
            <div className="grid grid-cols-2 gap-9 mt-10">
              <FormInput
                label="Full Name"
                form={form}
                name="fullname"
                placeholder={'john doe'}
              />
              <FormInput
                label="nick_name"
                form={form}
                name="nick_name"
                placeholder={'johndoe'}
              />
            </div>
            <div className="grid grid-rows gap-2 my-4">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="!text-sm">
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
              <FormItem className="col-span-2 mt-4">
                <FormLabel className="mb-2 text-[#2183C4]">
                  Add Skills
                </FormLabel>
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          {
                            value: 'communication-skills',
                            label: 'Communication Skills',
                          },
                          {
                            value: 'problem-solving',
                            label: 'Problem-Solving',
                          },
                          { value: 'teamwork', label: 'Teamwork' },
                        ]}
                        placeholder="Add Skills"
                      />
                    </FormControl>
                  )}
                />
              </FormItem>
            </div>
            <Button
              loading={isUpdatingProfile}
              className="text-md my-4 rounded-md px-7 hover:bg-primary-600"
              type="submit"
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ProfileSettings;
