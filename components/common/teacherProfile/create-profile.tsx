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
import { ITeacherLogin } from './type';
import { countrySelectDropdownProps } from './constant';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';

const formSchema = z.object({
  name: z.string().min(2).max(50).nonempty('Name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email address is required'),
  country: z.string().nonempty('Country is required'),
  language: z.string().min(1, 'Language is required').optional(),
  gender: z.string().nonempty('Gender is required'),
});

export const CreateProfile: React.FC = () => {
  const form = useForm<ITeacherLogin>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      country: '',
      gender: '',
      languages: [],
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit: SubmitHandler<ITeacherLogin> = async (
    data: ITeacherLogin
  ) => {
    console.log(data, 'submitted data');
    // userLogin(data);
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <TopNavbar
        onLogout={() => console.log('logout')}
        className="fixed top-0 w-full z-50 "
      />

      <div className=" p-4 mb-36 mx-auto ">
        <div className="">
          <div className="mx-auto mt-20 md:mt-20  md:w-96">
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
                    name="name"
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
                    label="Email Adress"
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
                          <Dropdown
                            className="mt-2"
                            label="Select your country"
                            {...countrySelectDropdownProps}
                            onChange={(value: any) => {
                              field.onChange(value?.value);
                            }}
                          />
                          <FormMessage />
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
                    name="languages"
                    render={({ field }) => {
                      return (
                        <>
                          <FormLabel className="text-sm">Languages</FormLabel>
                          <Dropdown
                            className="mt-2"
                            multSelect={true}
                            label="Add language"
                            value={field.value}
                            {...countrySelectDropdownProps}
                            onChange={(value: any) => {
                              const selectlanguage = value.map(
                                (item: any) => item.value
                              );
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
