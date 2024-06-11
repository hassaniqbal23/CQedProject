import {
  Form,
  Card,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Textarea,
  Button,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProfileImage, uploadProfileImage } from '@/app/api/admin';

import { toast } from 'sonner';
import { FormInput } from '../From/FormInput';
import ImageUpload from '../ImageUpload/ImageUpload';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import DatePicker from '@/components/ui/date-picker/date-picker';
import { SelectCountry } from '@/components/ui/select-v2/select-v2-components';
import MultipleSelector from '../From/MultiSelect';
import { Typography } from '../Typography/Typography';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  username: z.string().min(5, {
    message: 'username must be at least 5 characters',
  }),
  photo: z.string(),
});

const StudentProfileSettings = () => {
  const { userInformation, isUserGetInfo } = useGlobalState();
  const refetch = useQueryClient();

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      username: '',
      photo: '',
      birthday: '',
      country: '',
      gender: '',
      language: [],
      interests: [],
      aboutMe: '',
      aboutMyCulture: '',
      amazingThing: '',
      shareExploreLearn: '',
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
      form.setValue('name', userInformation.name);
      form.setValue('username', userInformation.username);
      form.setValue('country', userInformation.country);
      form.setValue('birthday', userInformation.birthday);
      form.setValue('gender', userInformation.gender);
      form.setValue('language', userInformation.language);
      form.setValue('interests', userInformation.interests);
      form.setValue('aboutMe', userInformation.aboutMe);
      form.setValue('aboutMyCulture', userInformation.aboutMyCulture);
      form.setValue('amazingThing', userInformation.amazingThing);
      form.setValue('shareExploreLearn', userInformation.shareExploreLearn);
    }
  }, [userInformation]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
    console.log(values, 'dataa');
    console.log('ayaz');
    // form.reset();
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              label="Full Name"
              form={form}
              name="name"
              placeholder={'admin'}
            />
            <FormInput
              label="Set a Nickname"
              form={form}
              name="username"
              placeholder={'admin'}
            />

            <div className="grid md:grid-cols-2 md:gap-9 my-4 items-center">
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="!text-sm">Birthday</FormLabel>
                    <FormControl>
                      <DatePicker
                        selectDate={(data: any) => {
                          form.setValue('birthday', data);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-sm">Country</FormLabel>
                    <FormControl>
                      <SelectCountry
                        menuPosition={'fixed'}
                        onChange={(e: any) => {
                          if (!e) {
                            form.setValue('country', '');
                            return;
                          }
                          form.setValue('country', e.value);
                        }}
                        label=""
                      ></SelectCountry>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Rest of the form fields */}
            <div className="grid md:grid-cols-2 md:gap-9 my-4 items-center">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <ChipSelector
                        onChange={(data: any) => field.onChange(data as string)}
                        options={[
                          {
                            label: 'Male',
                            value: 'Male',
                            render: (data: any) => (
                              <div className="w-24 text-sm">{data.label}</div>
                            ),
                          },
                          {
                            label: 'Female',
                            value: 'Female',
                            render: (data: any) => (
                              <div className="w-24 text-sm">{data.label}</div>
                            ),
                          },
                          {
                            label: 'Non-binary',
                            value: 'Non-binary',
                            render: (data: any) => (
                              <div className="w-24 text-sm">{data.label}</div>
                            ),
                          },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => {
                  const values = form.watch();

                  return (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          options={[
                            { value: 'English', label: 'English' },
                            { value: 'Udru', label: 'Udru' },
                            { value: 'Spanish', label: 'Spanish' },
                            { value: 'French', label: 'French' },
                          ]}
                          placeholder="Add Languages "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-9 my-4 items-center">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-sm">Interests</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Add interests"
                        options={[
                          { value: 'culture', label: 'Culture' },
                          { value: 'languages', label: 'Languages' },
                          { value: 'vulticulus', label: 'Vulticulus' },
                          { value: 'alias', label: 'Alias' },
                          { value: 'adventure', label: 'Adventure' },
                          { value: 'ait', label: 'Ait' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-rows gap-2">
              <FormField
                control={form.control}
                name="aboutMe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-sm">About Me</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I'm John, a sophomore at UCLA. I love playing basketball, especially streetball, and I'm also really into photography."
                        className="h-[130px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutMyCulture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-sm">
                      {' '}
                      About My Culture
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="My culture centers on family gatherings and holiday celebrations with lots of food, especially Christmas with a big feast and tree decorating."
                        className="h-[130px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amazingThing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-sm">
                      {' '}
                      One amazing thing I have done, seen, heard or thought
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I once traveled to Europe and saw the Eiffel Tower. It was absolutely incredible...."
                        className="h-[130px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shareExploreLearn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-sm">
                      Share, Explore, Learn
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Did you know that the world's smallest mammal is the bumblebee bat? It's smaller than a bumblebee and weighs less than a penny!"
                        className="h-[130px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="text-md" type="submit">
              Save Settings
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default StudentProfileSettings;
