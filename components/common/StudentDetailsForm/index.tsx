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
} from '@/components/ui';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui';
import { useForm } from 'react-hook-form';
import Progressbar from '../Progressbar/Progressbar';
import DatePicker from '@/components/ui/date-picker/date-picker';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import BottomNavbar from '../navbar/bottomNavbar';
import { useMutation } from 'react-query';
import { countrySelectOptions, DropdownMenuPropsOptions } from '@/lib/constant';
import { StudentsCreate } from '@/app/api/students';
import { IStudentInfo } from '@/app/api/types';
import {
  SelectCountry,
  SelectLanguage,
} from '@/components/ui/select-v2/select-v2-components';

const formSchema = z.object({
  fullname: z.string().refine((value) => value.trim() !== '', {
    message: 'Please enter your Full name',
  }),
  nick_name: z.string().refine((value) => value.trim() !== '', {
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
  language: z.string().refine((value) => value.trim() !== '', {
    message: 'Please Select one language.',
  }),
});

function StudentsDetailsFrom() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      nick_name: '',
      country: '',
      gender: '',
      language: '',
    },
  });

  const { mutate: createStudents, isLoading } = useMutation(
    (studentsData: IStudentInfo) => StudentsCreate(studentsData),
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

  const onSubmit = form.handleSubmit(async (values: any) => {
    createStudents(values);
  });

  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto mt-8 mb-8 h-[calc(100vh_-_30px)] lg:h-[calc(100vh_-_224px)] ">
        <div className="my-8">
          <Progressbar heading="Get Started" percentage={20} />
        </div>
        <div className="flex flex-col justify-center items-center mb-4">
          <h1 className="text-primary font-bold text-2xl">
            Let’s get started with creating your profile
          </h1>
          <h3 className="font-semibold text-[#a3adbc] text-[17px] ">
            Learn, grow, and thrive on a global scale!
          </h3>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className=" grid md:grid-cols-2 md:gap-6">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g John, Emma"
                          {...field}
                          className="w-full"
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
                        <Input placeholder="e.g example@12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" grid md:grid-cols-2 md:gap-6">
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel>Birthday</FormLabel>
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
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <SelectCountry
                          menuPosition={'fixed'}
                          onChange={(e: any) => {
                            if (!e) {
                              form.setValue('country', '');
                              return;
                            }
                            form.setValue('country', e.value);
                            form.setValue('language', '');
                          }}
                          label=""
                        ></SelectCountry>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
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
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => {
                    const values = form.watch();

                    return (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <SelectLanguage
                            menuPosition={'fixed'}
                            isDisabled={values.country.length == 0}
                            label=""
                            countryCode={values.country}
                            onChange={(e: any) => {
                              if (!e) {
                                form.setValue('language', '');
                                return;
                              }
                              form.setValue('language', e.value);
                            }}
                          ></SelectLanguage>
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
        isBackButton={false}
        onContinue={async () => {
          onSubmit(form.getValues() as any);
        }}
      ></BottomNavbar>
    </>
  );
}

export default StudentsDetailsFrom;
