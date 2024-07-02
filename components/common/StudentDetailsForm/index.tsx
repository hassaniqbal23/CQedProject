import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import Progressbar from '../Progressbar/Progressbar';
import DatePicker from '@/components/ui/date-picker/date-picker';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import MultipleSelector from '@/components/common/From/MultiSelect';
import BottomNavbar from '../navbar/bottomNavbar';
import { useMutation } from 'react-query';
import { StudentsCreate } from '@/app/api/students';
import { ICreateStudent } from '@/app/api/types';
import { SelectCountry } from '@/components/ui/select-v2/select-v2-components';
import { Typography } from '../Typography/Typography';
import { getSingleCountry } from '@/lib/utils';
import { useGlobalState } from '@/app/globalContext/globalContext';

const formSchema = z.object({
  fullname: z.string().refine((value) => value.trim() !== '', {
    message: 'Please enter your Full name',
  }),
  nick_name: z.string().refine((value) => value.trim() !== '', {
    message: 'Please enter your Nickname.',
  }),
  dob: z
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
  languages: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty({ message: 'Please Select one language.' }),
  university: z.string().optional(),
});

function StudentsDetailsFrom() {
  const router = useRouter();
  const { userInformation } = useGlobalState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      dob: undefined,
      nick_name: '',
      country: '',
      gender: '',
      languages: [],
    },
  });
  const { handleSubmit } = form;

  const { mutate: createStudents, isLoading } = useMutation(
    (studentsData: ICreateStudent) => StudentsCreate(studentsData),
    {
      onSuccess: (res: any) => {
        router.push('/students/onboarding/about-user');
        form.reset();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  useEffect(() => {
    if (userInformation) {
      form.setValue('university', userInformation?.school?.name);
    }
  }, [userInformation]);

  const onSubmit: SubmitHandler<any> = async (values: ICreateStudent) => {
    const submit = {
      ...values,
      languages: values?.languages?.map((i) => i.value) as any,
    };
    const { university, ...payload } = submit;
    createStudents(payload);
  };

  return (
    <>
      <div className="flex flex-col w-9/12 items-center mx-auto mt-8  h-screen ">
        <div className="my-8 w-2/6 ">
          <Progressbar heading="Get Started" percentage={0} />
        </div>
        <div className="flex flex-col justify-center items-center mb-4">
          <Typography
            variant={'h3'}
            weight={'bold'}
            className="text-primary mb-1"
          >
            Let’s get started with creating your profile
          </Typography>
          <Typography
            variant={'h4'}
            weight={'regular'}
            className="text-[#a3adbc] w-full flex justify-center mb-3"
          >
            Learn, grow, and thrive on a global scale!
          </Typography>
        </div>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-9 ">
              <div className="grid md:grid-cols-2 md:gap-9 items-center">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., John Smith, Emma Jones"
                          {...field}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nick_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Set nickname</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g Moon, Lim" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 md:gap-9 gap-2 items-center">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel>Birthday</FormLabel>
                      <FormControl>
                        <DatePicker
                          defaultValue={field.value || undefined}
                          selectDate={(data: any) => {
                            form.setValue('dob', data);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <ChipSelector
                          onChange={(data: any) =>
                            field.onChange(data as string)
                          }
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
              </div>
              <div className="grid md:grid-cols-1 ">
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder="e.g., Stanford University"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 md:gap-6 ">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <SelectCountry
                            menuPosition={'fixed'}
                            placeholder="Select your country"
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            value={field.value}
                            options={[
                              { value: 'English', label: 'English' },
                              { value: 'Udru', label: 'Udru' },
                              { value: 'Spanish', label: 'Spanish' },
                              { value: 'French', label: 'French' },
                            ]}
                            creatable={true}
                            placeholder="Add Your Languages "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
      <BottomNavbar
        buttonLoading={isLoading}
        isBackButton={false}
        onContinue={async () => {
          onSubmit(form.getValues() as any);
        }}
      ></BottomNavbar>
    </>
  );
}

export default StudentsDetailsFrom;
