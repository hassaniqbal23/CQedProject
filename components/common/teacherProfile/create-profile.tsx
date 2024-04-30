'use client';
import React, { useEffect } from 'react';
import TopNavbar from '../navbar/TopNavbar';
import Progressbar from '../Progressbar/Progressbar';

import {
  Dropdown,
  Form,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import BottomNavbar from '../navbar/bottomNavbar';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../From/FormInput';
import { ITeacherCreate } from './type';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import { SelectInput } from '../From/Select';
import { DropdownMenuPropsOptions, countrySelectOptions } from '@/lib/constant';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { TeacherCreate } from '@/app/api/teachers';

const formSchema = z.object({
  fullname: z.string().min(2).max(50).nonempty('Name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email address is required'),
  country: z.string().nonempty('Country is required'),
  language: z.string().min(1, 'Language is required').optional(),
  gender: z.string().nonempty('Gender is required'),
});

export const CreateProfile: React.FC = () => {
  const form = useForm<ITeacherCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      country: '',
      gender: '',
      language: '',
    },
  });

  const router = useRouter();
  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const { mutate: createTeacher, isLoading: isCreating } = useMutation(
    (userData: ITeacherCreate) => TeacherCreate(userData),
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        router.push('/teachers/onboarding/about-you');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit: SubmitHandler<ITeacherCreate> = async (
    data: ITeacherCreate
  ) => {
    createTeacher(data);
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <TopNavbar
        onLogout={() => console.log('logout')}
        className="fixed top-0 w-full z-50 "
      />

      <div className=" p-4 mx-auto ">
        <div className="">
          <div className="mx-auto mt-4 md:w-96">
            <Progressbar heading={'Get Started'} percentage={20} />
          </div>
          <div className="mx-auto w-max mt-4">
            <h1 className="text-[#4146B8] text-2xl font-mono not-italic font-bold leading-10">
              Create your profile
            </h1>
            <p>Learn grow, and thrive together!</p>
          </div>
        </div>

        <div className="px-20 mt-10">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-6">
                <div className="mb-4">
                  <FormInput
                    required={true}
                    form={form}
                    name="fullname"
                    placeholder="e.g John, Emma"
                    label="Full Name"
                  />
                </div>
                <div className="mb-4">
                  <FormInput
                    required={true}
                    form={form}
                    name="email"
                    placeholder="e.g example@12"
                    label="Email Address"
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => {
                      return (
                        <>
                          <FormLabel className="text-sm">Country</FormLabel>
                          <div className="mt-2.5">
                            <SelectInput
                              placeholder="Select your country"
                              options={countrySelectOptions}
                              onChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                            <FormMessage />
                          </div>
                        </>
                      );
                    }}
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => {
                      return (
                        <div className="">
                          <FormLabel className="text-sm">Gender</FormLabel>
                          <ChipSelector
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                            options={[
                              {
                                label: 'Male',
                                value: 'Male',

                                render: (data: any) => {
                                  return <div>{data.label}</div>;
                                },
                              },
                              {
                                label: 'Female',
                                value: 'Female',
                                render: (data: any) => <div>{data.label}</div>,
                              },
                              {
                                label: 'Non-binary',
                                value: 'Non-binary',
                                render: (data: any) => <div>{data.label}</div>,
                              },
                            ]}
                          />
                          <FormMessage />
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => {
                      return (
                        <>
                          <FormLabel className="text-sm">Languages</FormLabel>
                          <Dropdown
                            className="mt-2"
                            multSelect={true}
                            label="Add language"
                            value={field.value as any}
                            options={DropdownMenuPropsOptions.options}
                            onChange={(value: any) => {
                              const selectlanguage = value
                                .map((item: any) => item.value)
                                .join(',');
                              form.setValue('language', selectlanguage);
                              field.onChange(selectlanguage);
                            }}
                          />
                          <FormMessage />
                        </>
                      );
                    }}
                  />
                </div>
              </div>

              <div className="fixed bottom-0 w-full z-50 left-0">
                <BottomNavbar
                  buttonType="submit"
                  buttonLoading={isCreating}
                  onContinue={() => console.log('checking')}
                  onBackButton={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
