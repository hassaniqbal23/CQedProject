'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { SubmitHandler, useForm } from 'react-hook-form';
import { IEducation, IWorkExperience } from '@/types/tearcher';
import { UseQueryResult, useMutation, useQuery } from 'react-query';
import {
  createWorkExperience,
  deleteworkExperienceById,
  getWorkExperience,
  getWorkExperienceById,
  updateworkExperienceById,
} from '@/app/api/teachers';
import EducationCard from './EducationCard';
import DatePickerDemo from '@/components/ui/date-picker/date-picker';

const formSchema = z.object({
  title: z.string().nonempty('Title Level is required'),
  companyName: z.string().nonempty('Institution is required'),
  startDate: z.string().nonempty('Start Date is required'),
  endDate: z.string().nonempty('End Date is required'),
  location: z.string().nonempty('Location is required'),
});

export const AddWorkExperience = () => {
  const [workExperienceId, setWorkExperienceId] = useState<number | null>(null);

  const form = useForm<IWorkExperience>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      companyName: '',
      startDate: '',
      endDate: '',
      location: '',
    },
  });
  const { handleSubmit, setValue } = form;

  const {
    data: workExperience,
    error,
    isLoading,
    refetch,
  }: UseQueryResult<IWorkExperience[], Error> = useQuery(
    ['getWorkExperience'],
    () => getWorkExperience()
  );

  const { mutate: mutateWorkExperience, isLoading: isCreating } = useMutation(
    (userData: IWorkExperience) =>
      createWorkExperience({ ...userData, employmentType: '' }),
    {
      onSuccess: (res) => {
        refetch();
        form.reset();
        setWorkExperienceId(null);
      },
    }
  );
  const { mutate: mutateDeleteworkExperienceById, isLoading: isDeleting } =
    useMutation((id: number) => deleteworkExperienceById(id), {
      onSuccess: (res) => {
        refetch();
        setWorkExperienceId(null);
      },
    });
  const { mutate: updateWorkExperience, isLoading: isUpdating } = useMutation(
    (userData: IWorkExperience) =>
      updateworkExperienceById(userData, workExperienceId as number),
    {
      onSuccess: (res) => {
        refetch();
        form.reset();
        setWorkExperienceId(null);
      },
    }
  );
  const {
    isLoading: isGettingValueById,
  }: UseQueryResult<IWorkExperience, Error> = useQuery(
    ['getWorkExperienceById', workExperienceId],
    () => getWorkExperienceById(workExperienceId),
    {
      enabled: workExperienceId ? true : false,
      onSuccess: (res: IWorkExperience) => {
        setValue('title', res.title);
        setValue('companyName', res.companyName);
        setValue('endDate', res.endDate);
        setValue('startDate', res.startDate);
        setValue('location', res.location);
      },
    }
  );

  const onSubmit: SubmitHandler<IWorkExperience> = async (
    data: IWorkExperience
  ) => {
    if (workExperienceId) {
      updateWorkExperience(data);
    } else {
      mutateWorkExperience(data);
    }
  };

  const handleEducationEdit = (id: number) => {
    setWorkExperienceId(id);
  };

  return (
    <>
      {workExperience
        ?.filter((c) => c.id !== workExperienceId)
        ?.map((education: IWorkExperience, index) => (
          <div key={index} className="pt-2 mb-3">
            <EducationCard
              imageUrl="/briefcase.svg"
              educationLevel={education.title || ''}
              country={education.location}
              institution={education.companyName}
              startDate={education.startDate}
              endDate={education.endDate}
              editButtonOnClick={() => {
                education.id && handleEducationEdit(education.id);
              }}
              deleteButtonOnClick={() =>
                education.id && mutateDeleteworkExperienceById(education.id)
              }
            />
          </div>
        ))}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-2 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. High School English Teacher"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Harvard University"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Los Angeles, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <DatePickerDemo
                        defaultValue={
                          field.value ? new Date(field.value) : undefined
                        }
                        selectDate={(data: string) => {
                          field.onChange(data.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-6 ">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <DatePickerDemo
                        defaultValue={
                          field.value ? new Date(field.value) : undefined
                        }
                        selectDate={(data: string) => {
                          field.onChange(data.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-8">
            <Button
              loading={isCreating || isUpdating}
              type="submit"
              icon={<Plus />}
              variant="outline"
              className="flex items-center rounded-lg"
            >
              <Plus size={18} strokeWidth={3} />
              {workExperienceId
                ? ' Update work experience'
                : '  Add work experience'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
