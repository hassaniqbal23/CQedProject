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
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Camera, CircleUser, ImagePlus } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().refine((value) => value.trim() !== '', {
    message: 'Please enter your Full name',
  }),
  nickName: z.string().refine((value) => value.trim() !== '', {
    message: 'Please enter your Nickname.',
  }),
  birthday: z
    .date()
    .refine((value) => !isNaN(value.getTime()), {
      message: 'Please select a valid date.',
    })
    .transform((value) => (isNaN(value.getTime()) ? null : value)),
  country: z.string().refine((value) => value.trim() !== '', {
    message: 'Please select your Country.',
  }),
  gender: z.string().refine((value) => value.trim() !== '', {
    message: ' Please select your Gender.',
  }),
  language: z
    .array(
      z
        .object({
          label: z.string(),
          value: z.string(),
          flagUrl: z.string(),
          altName: z.string(),
        })
        .optional()
    )
    .refine((value) => (value.length > 0 ? true : false), {
      message: 'Please Select one language.',
    }),
});

function AboutStudentsForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      nickName: '',
      country: '',
      gender: '',
      language: [],
    },
  });

  const onSubmit: SubmitHandler<any> = form.handleSubmit(async (values) => {
    // createStudents(values)
    router.push('/students/onboarding/qualities');
  });
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
                name="fullName"
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
              <FormField
                control={form.control}
                name="nickName"
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
                name="birthday"
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
                name="country"
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
          // onSubmit(form.getValues())
        }}
      ></BottomNavbar>
    </>
  );
}

export default AboutStudentsForm;
