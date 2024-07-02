'use client';
import React, { useEffect } from 'react';
import Progressbar from '../Progressbar/Progressbar';
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui';
import BottomNavbar from '../navbar/bottomNavbar';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../From/FormInput';
import { ITeacherCreate } from './type';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { TeacherCreate } from '@/app/api/teachers';
import { SelectCountry } from '@/components/ui/select-v2/select-v2-components';
import { Typography } from '../Typography/Typography';
import { SelectV2Creatable } from '@/components/ui/select-v2/select-v2';
import DatePicker from '@/components/ui/date-picker/date-picker';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { getSingleCountry } from '@/lib/utils';
import MultipleSelector from '../From/MultiSelect';

const formSchema = z.object({
  fullname: z.string().min(2).max(50).nonempty('Name is required'),
  nickname: z.string().min(2).max(50).nonempty('Nickname is required'),
  country: z.string().nonempty('Country is required'),
  dob: z.string().nonempty('Birthday is required'),
  languages: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .nonempty('Language is required'),
  gender: z.string().nonempty('Gender is required'),
});

export const CreateProfile: React.FC = () => {
  const { userInformation } = useGlobalState();
  const form = useForm<ITeacherCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      nickname: '',
      country: '',
      gender: '',
      dob: '',
      languages: [],
    },
  });

  const router = useRouter();
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = form;

  const { mutate: createTeacher, isLoading: isCreating } = useMutation(
    (userData: ITeacherCreate) => TeacherCreate(userData),
    {
      onSuccess: (res) => {
        router.push('/teachers/onboarding/about-you');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  useEffect(() => {
    if (userInformation) {
      setValue('university', userInformation?.school?.name || '');
      setValue('email', userInformation?.email || '');
    }
  }, [userInformation]);

  const onSubmit: SubmitHandler<ITeacherCreate> = async (
    data: ITeacherCreate
  ) => {
    const language = data.languages.map(
      (c: { label: string; value: string }) => c.value
    );
    const { university, email, ...payload } = data;
    const submitdata: ITeacherCreate = {
      ...payload,
      languages: language,
      email: userInformation.email,
    };
    createTeacher(submitdata);
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="mx-auto ">
        <div className="p-4 py-6">
          <div className="mx-auto mt-4 md:w-96">
            <Progressbar heading={'Get Started'} percentage={20} />
          </div>
          <div className="">
            <Typography
              variant="h2"
              weight="bold"
              className="text-primary-500 text-center"
            >
              Let’s get started with creating your profile
            </Typography>
            <Typography
              variant="h4"
              weight="regular"
              className="text-center text-[#464650]"
            >
              Learn, grow, and thrive on a global scale!
            </Typography>
          </div>
        </div>

        <div className="mt-10">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" px-24 grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                <div className="mb-4">
                  <FormInput
                    required={true}
                    form={form}
                    name="fullname"
                    placeholder="e.g., John Smith, Emma Jones"
                    label="Full Name"
                  />
                </div>
                <div className="mb-4">
                  <FormInput
                    required={true}
                    form={form}
                    name="nickname"
                    placeholder="e.g., Moin, Lim"
                    label="Set a Nickname"
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => {
                      const values = form.watch();
                      return (
                        <>
                          <FormLabel className="text-sm">Birthday</FormLabel>
                          <div className="mt-a">
                            <DatePicker
                              selectDate={(date: Date) =>
                                field.onChange(date?.toISOString())
                              }
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
                            size={'md'}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                            options={[
                              {
                                label: 'Male',
                                value: 'Male',

                                render: (data: any) => {
                                  return (
                                    <div className="px-6">{data.label}</div>
                                  );
                                },
                              },
                              {
                                label: 'Female',
                                value: 'Female',
                                render: (data: any) => (
                                  <div className="px-6">{data.label}</div>
                                ),
                              },
                              {
                                label: 'Non-binary',
                                value: 'Non-binary',
                                render: (data: any) => (
                                  <div className="px-6">{data.label}</div>
                                ),
                              },
                            ]}
                          />
                          <FormMessage />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="px-24 grid grid-cols-1 md:grid-cols-1 gap-6 pb-6">
                <div className="mb-4">
                  <FormInput
                    width={'100%'}
                    required={true}
                    form={form}
                    readOnly
                    name="university"
                    placeholder="e.g., Stanford University"
                    label="University"
                  />
                </div>
              </div>
              <div className="px-24 grid grid-cols-1 md:grid-cols-1 gap-6 pb-6">
                <div className="mb-4">
                  <FormInput
                    width={'100%'}
                    required={true}
                    form={form}
                    readOnly
                    name="email"
                    label="Email"
                  />
                </div>
              </div>
              <div className=" px-24 grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => {
                      const values = form.watch();
                      return (
                        <>
                          <FormLabel className="text-sm">Country</FormLabel>
                          <div className="mt-a">
                            <SelectCountry
                              menuPosition={'fixed'}
                              value={
                                field.value
                                  ? {
                                      label: getSingleCountry(field?.value)
                                        ?.label,
                                      value: field.value,
                                    }
                                  : undefined
                              }
                              onChange={(e: any) => {
                                field.onChange(e.value);
                              }}
                              label=""
                            ></SelectCountry>
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
                    name="languages"
                    render={({ field }) => {
                      return (
                        <>
                          <FormLabel className="text-sm">Languages</FormLabel>
                          <MultipleSelector
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                              { value: 'English', label: 'English' },
                              { value: 'Udru', label: 'Udru' },
                              { value: 'Spanish', label: 'Spanish' },
                              { value: 'French', label: 'French' },
                            ]}
                            creatable={true}
                            placeholder="Select Languages"
                          />
                          <FormMessage />
                        </>
                      );
                    }}
                  />
                </div>
              </div>

              <div className="fixed bottom-0 w-full ">
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
