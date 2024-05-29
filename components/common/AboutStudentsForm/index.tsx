'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dropdown,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui';
import { useForm, SubmitHandler } from 'react-hook-form';
import Progressbar from '../Progressbar/Progressbar';
import BottomNavbar from '../navbar/bottomNavbar';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Camera, CircleUser, ImagePlus } from 'lucide-react';
import ImageUpload from '../ImageUpload/ImageUpload';
import { deleteProfileImage, uploadProfileImage } from '@/app/api/admin';
import { useGlobalState } from '@/app/gobalContext/globalContext';

const formSchema = z.object({
  bio: z.string().refine((value) => value.trim() !== '', {
    message: 'Please add a bio',
  }),
  avatar: z
    .string()
    // .refine((value) => value.trim() !== '', {
    //   message: 'Please add a profile picture',
    // })
    .optional(),
  culture: z.string().refine((value) => value.trim() !== '', {
    message: 'Please tell us about your culture',
  }),
  posts: z
    .array(
      z.object({
        image: z.string(),
      })
    )
    .refine((value) => value.length <= 0, {
      message: 'Please add at least one post',
    }),
});

function AboutStudentsForm() {
  const { userInformation, isUserGetInfo } = useGlobalState();
  const router = useRouter();
  const refetch = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: '',
      bio: '',
      culture: '',
    },
  });

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

  // const onSubmit: SubmitHandler<any> = form.handleSubmit(async (values) => {
  //   // createStudents(values)
  //
  // });
  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto mt-8 mb-8">
        <div className="my-8">
          <Progressbar heading="Doing great!" percentage={40} />
        </div>
        <div className="flex flex-col justify-center items-center mb-4">
          <h1 className="text-primary font-bold text-2xl">About You</h1>
          <h3 className="font-semibold text-[#a3adbc] text-[17px] ">
            Tell us about yourself.
          </h3>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={() => console.log('submit')}
              className="flex flex-col gap-10"
            >
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
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Write about yourself</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about you. What makes you smile! What is unique about you?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="culture"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>
                      Tell us about your culture and customs. What is most
                      significant for you? Remember, what seems normal to you
                      may be new for somebody else across the world. Share so
                      they may learn.
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share the richness of your culture. What would you like people to know? What is special about where you live?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="culture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Upload pictures of what you wish to share - your culture,
                      your pets, your favourite dish, your hobby...
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-4 gap-4 mt-2">
                        {[1, 2, 3, 4].map((item) => {
                          return (
                            <div
                              key={item}
                              className="p-3 w-full h-36 cursor-pointer border-2 border-dashed rounded flex items-center justify-center "
                            >
                              <ImagePlus />
                            </div>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <BottomNavbar
        isBackButton={false}
        onContinue={() => {
          router.push('/students/onboarding/qualities');
          // onSubmit(form.getValues());
        }}
      ></BottomNavbar>
    </>
  );
}

export default AboutStudentsForm;
