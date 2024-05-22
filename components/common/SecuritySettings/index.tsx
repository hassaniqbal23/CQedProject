import React from 'react';
import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../../ui';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from 'react-query';
import { changePassword } from '@/app/api/admin';
import { toast } from 'sonner';

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(5, { message: 'Name must be at least 5 characters' }),
    newPassword: z
      .string()
      .min(5, { message: 'Password must be at least 5 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

function SecuritySettings() {
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const { mutate: changePasswordApi, isLoading } = useMutation(
    (data: any) => changePassword(data),
    {
      onSuccess: (res) => {
        form.reset();
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit: SubmitHandler<any> = (data) => {
    const submit = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    changePasswordApi(submit);
  };

  return (
    <Card className="w-full p-4">
      <h2 className="text-lg font-bold">Change Password</h2>
      <div className="sm:w-1/2 mt-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              name="currentPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-2">Current Password</FormLabel>
                    <FormControl className="mb-6">
                      <Input
                        placeholder="Enter Current Password"
                        {...field}
                        {...register('currentPassword')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-2">New Password</FormLabel>
                    <FormControl className="mb-6">
                      <Input
                        placeholder="Enter New Password"
                        {...field}
                        {...register('newPassword')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Confirm Password</FormLabel>
                  <FormControl className="mb-6">
                    <Input
                      placeholder="Confirm Password"
                      {...field}
                      {...register('confirmPassword')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
              <Button loading={isLoading} className="w-full" type="submit">
                Reset Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
}

export default SecuritySettings;
