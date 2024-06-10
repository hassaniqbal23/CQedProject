import { Form, Card } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProfileImage, uploadProfileImage } from '@/app/api/admin';
import { toast } from 'sonner';
import { FormInput } from '../From/FormInput';
import ImageUpload from '../ImageUpload/ImageUpload';

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
          <form className="grid grid-cols-2 gap-5 mt-10">
            <FormInput
              disabled
              label="Full Name"
              required={true}
              form={form}
              name="fullName"
              placeholder={'admin'}
            />
            <FormInput
              disabled
              label="Username"
              required={true}
              form={form}
              name="username"
              placeholder={'admin'}
            />
          </form>
        </Form>
      </div>
    </Card>
  );
}

export default ProfileSettings;
