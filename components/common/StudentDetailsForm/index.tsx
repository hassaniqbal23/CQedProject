import React from 'react';
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
import { useForm } from 'react-hook-form';
import Progressbar from '../Progressbar/Progressbar';
import DatePicker from '@/components/ui/date-picker/date-picker';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import MultipleSelector from '@/components/common/From/MultiSelect';
import BottomNavbar from '../navbar/bottomNavbar';
import { useMutation } from 'react-query';
import { StudentsCreate } from '@/app/api/students';
import { IStudentInfo } from '@/app/api/types';
import { SelectCountry } from '@/components/ui/select-v2/select-v2-components';
import { Typography } from '../Typography/Typography';

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
  language: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty({ message: 'Please Select one language.' }),
  university: z.string().refine((value) => value.trim() !== '', {
    message: 'Please enter your University.',
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
      language: [],
      university: '',
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
            <form onSubmit={onSubmit} className="space-y-9 ">
              <div className="grid md:grid-cols-2 md:gap-9 items-center">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g John, Emma"
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
                          placeholder="Harvard"
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
                          }}
                          label=""
                        ></SelectCountry>
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
        isBackButton={false}
        onContinue={async () => {
          onSubmit(form.getValues() as any);
        }}
      ></BottomNavbar>
    </>
  );
}

export default StudentsDetailsFrom;
