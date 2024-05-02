import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Card,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      photo: '',
    },
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  return (
    <Card className="w-full p-4 mt-6">
      <h1 className="text-xl font-bold">Basic Information</h1>
      <div className="mt-8 flex flex-col items-center w-1/5">
        <div className="relative">
          <Image
            src={'/assets/images/user-image.png'}
            alt="user image"
            width={200}
            height={200}
            className="rounded-full"
          />
          <div className="absolute p-2 bg-white border right-1 bottom-4 rounded-full cursor-pointer">
            <Camera />
          </div>
        </div>
        <h2 className="mt-2 font-semibold">Choose your avatar</h2>
      </div>
      <div>
        <Form {...form}>
          <form className="grid grid-cols-2 gap-5 mt-10">
            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-2">Full Name</FormLabel>
                    <FormControl className="mb-6">
                      <Input
                        placeholder="Enter your Email or Username!"
                        {...field}
                        {...register('fullName')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Username</FormLabel>
                  <FormControl className="mb-6">
                    <Input
                      placeholder="Enter your Username!"
                      {...field}
                      {...register('username')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </Card>
  );
}

export default ProfileSettings;
