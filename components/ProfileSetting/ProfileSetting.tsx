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
import MultipleSelector from '../common/From/MultiSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProfileImage, uploadProfileImage } from '@/app/api/admin';
import { toast } from 'sonner';
import ImageUpload from '../common/ImageUpload/ImageUpload';
import { FormInput } from '../common/From/FormInput';
import { teacherUpdateProfile } from '@/app/api/teachers';
import { IUserInformation } from '@/app/globalContext/types';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  username: z.string().min(5, {
    message: 'Username must be at least 5 characters',
  }),
  photo: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

const ProfileSettings = () => {
  const { userInformation, isUserGetInfo } = useGlobalState();
  const queryClient = useQueryClient();
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: userInformation?.profile?.full_name || '',
      username: userInformation?.profile?.nick_name || '',
      photo: userInformation?.attachment?.file_path || '',
      bio: userInformation?.profile?.bio || '',
      skills: userInformation?.profile?.skills || [],
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

  const { mutate: updateTeacherProfile, isLoading: isUpdatingProfile } = useMutation(
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
      form.setValue('fullName', userInformation.profile?.full_name || userInformation.name);
      form.setValue('username', userInformation.profile?.nick_name);
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

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log('Form Submitted:', data); // Debugging log
    // const formData = form.getValues();

    // const transformedSkills = formData.skills.map((skill: { value: string }) => skill.value);

    // const payload: IUserInformation = {
    //   ...formData,
    //   skills: transformedSkills,
    // };

    // if (userInformation?.profile?.id) {
    //   updateTeacherProfile({ profileId: userInformation.profile.id, payload });
    // }
  };

  return (
    <Card className="w-full p-4 mt-6">
      <h1 className="text-xl font-bold">Basic Information</h1>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5 mt-10">
            <FormInput
              label="Full Name"
              required={true}
              form={form}
              name="fullName"
              placeholder={'john doe'}
            />
            <FormInput
              label="Username"
              required={true}
              form={form}
              name="username"
              placeholder={'johndoe'}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="!text-sm">Write about yourself</FormLabel>
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
              <FormLabel className="mb-2 text-[#2183C4]">Add Skills</FormLabel>
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { value: 'communication-skills', label: 'Communication Skills' },
                        { value: 'problem-solving', label: 'Problem-Solving' },
                        { value: 'teamwork', label: 'Teamwork' },
                      ]}
                      placeholder="Add Skills"
                    />
                  </FormControl>
                )}
              />
            </FormItem>
            <div className="col-span-2 flex justify-start mt-4">
              <button
                type='submit'
                className="bg-primary text-white py-3 px-5 rounded-sm hover:bg-primary-600 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ProfileSettings;
