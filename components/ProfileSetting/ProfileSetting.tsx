import {
  Form,
  Card,
  Textarea,
  FormItem,
  FormLabel,
  Button,
} from '@/components/ui';
import MultipleSelector from '../common/From/MultiSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProfileImage, uploadProfileImage } from '@/app/api/admin';
import { toast } from 'sonner';
import ImageUpload from '../common/ImageUpload/ImageUpload';
import { FormInput } from '../common/From/FormInput';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  username: z.string().min(5, {
    message: 'username must be at least 5 characters',
  }),
  photo: z.string(),
});

function ProfileSettings() {
  const { userInformation, isUserGetInfo } = useGlobalState();
  const refetch = useQueryClient();

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      username: '',
      photo: '',
    },
  });

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

  useEffect(() => {
    if (userInformation) {
      form.setValue('fullName', userInformation.name);
      form.setValue('username', userInformation.name);
    }
  }, [userInformation]);

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    // handle form submission
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5 mt-10"
          >
            <FormInput
              label="Full Name"
              required={true}
              form={form}
              name="fullName"
              placeholder={'admin'}
            />
            <FormInput
              label="Username"
              required={true}
              form={form}
              name="username"
              placeholder={'admin'}
            />
          </form>
          <Textarea
            className="bg-gray-50"
            label="write about yourself"
            required={true}
            name="fullName"
          />
          <FormItem className="mt-10 col-span-2  ">
            <FormLabel className="mb-2 text-[#2183C4]">Add Skills</FormLabel>
            <MultipleSelector
              options={[
                {
                  value: 'communication-skills',
                  label: 'Communication Skills',
                },
                {
                  value: 'problem-solving',
                  label: 'Problem-Solving',
                },
                {
                  value: 'teamwork',
                  label: 'Teamwork',
                },
              ]}
              placeholder="Add Skills"
            />
          </FormItem>
          <div className="col-span-2 flex justify-start mt-4">
            <Button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </Card>
  );
}

export default ProfileSettings;
