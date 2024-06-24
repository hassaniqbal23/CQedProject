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
import { SelectCountry } from '@/components/ui/select-v2/select-v2-components';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { SubmitHandler, useForm } from 'react-hook-form';
import { IEducation } from '@/types/tearcher';
import { UseQueryResult, useMutation, useQuery } from 'react-query';
import {
  createEducation,
  deleteEducationById,
  getEducationById,
  getEducations,
  updateEducationById,
} from '@/app/api/teachers';
import EducationCard from './EducationCard';
import { getSingleCountry } from '@/lib/utils';
import DatePickerDemo from '@/components/ui/date-picker/date-picker';

const formSchema = z.object({
  educationLevel: z.string().nonempty('Education Level is required'),
  fieldOfStudy: z.string().nonempty('Field Of Study is required'),
  countryCode: z.string().nonempty('Country is required'),
  institution: z.string().nonempty('Institution is required'),
  startDate: z.string().nonempty('Start Date is required'),
  endDate: z.string().nonempty('End Date is required'),
});

export const AddEducation = () => {
  const [educationsId, setEducationsId] = useState<number | null>(null);

  const form = useForm<IEducation>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educationLevel: '',
      fieldOfStudy: '',
      countryCode: '',
      institution: '',
      startDate: '',
      endDate: '',
    },
  });
  const { handleSubmit, setValue } = form;

  const {
    data: educations,
    error,
    isLoading,
    refetch,
  }: UseQueryResult<IEducation[], Error> = useQuery(['getEducations'], () =>
    getEducations()
  );

  const { mutate: mutateAddEducation, isLoading: isCreating } = useMutation(
    (userData: IEducation) => createEducation(userData),
    {
      onSuccess: (res) => {
        refetch();
        form.reset();
        setEducationsId(null);
      },
    }
  );
  const { mutate: mutatedeleteEducationById, isLoading: isDeleting } =
    useMutation((id: number) => deleteEducationById(id), {
      onSuccess: (res) => {
        refetch();
        setEducationsId(null);
      },
    });
  const { mutate: updateEducation, isLoading: isUpdating } = useMutation(
    (userData: IEducation) =>
      updateEducationById(userData, educationsId as number),
    {
      onSuccess: (res) => {
        refetch();
        form.reset();
        setEducationsId(null);
      },
    }
  );
  const { isLoading: isGettingValueById }: UseQueryResult<IEducation, Error> =
    useQuery(
      ['getEducationById', educationsId],
      () => getEducationById(educationsId),
      {
        enabled: educationsId ? true : false,
        onSuccess: (res: IEducation) => {
          setValue('countryCode', res.countryCode);
          setValue('educationLevel', res.educationLevel);
          setValue('endDate', res.endDate);
          setValue('startDate', res.startDate);
          setValue('fieldOfStudy', res.fieldOfStudy);
          setValue('institution', res.institution);
        },
      }
    );

  const onSubmit: SubmitHandler<IEducation> = async (data: IEducation) => {
    if (educationsId) {
      updateEducation(data);
    } else {
      mutateAddEducation(data);
    }
  };

  const handleEducationEdit = (id: number) => {
    setEducationsId(id);
  };

  return (
    <>
      {educations
        ?.filter((c) => c.id !== educationsId)
        ?.map((education: IEducation, index) => (
          <div key={index} className="pt-2 mb-3">
            <EducationCard
              imageUrl="/graduate.svg"
              educationLevel={education.educationLevel || ''}
              fieldOfStudy={education.fieldOfStudy}
              country={education.countryCode}
              institution={education.institution}
              startDate={education.startDate}
              endDate={education.endDate}
              editButtonOnClick={() => {
                education.id && handleEducationEdit(education.id);
              }}
              deleteButtonOnClick={() =>
                education.id && mutatedeleteEducationById(education.id)
              }
            />
          </div>
        ))}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10 mt-8">
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <FormControl>
                    <Input
                      loading={isGettingValueById}
                      placeholder="e.g. Master's in Education"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fieldOfStudy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Field of Study</FormLabel>
                  <FormControl>
                    <Input
                      loading={isGettingValueById}
                      placeholder="e.g., Computer Science"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <SelectCountry
                        value={
                          field.value
                            ? {
                                label: getSingleCountry(field?.value)?.label,
                                value: field.value,
                              }
                            : undefined
                        }
                        onChange={(newValue: any) => {
                          field.onChange(newValue?.value);
                        }}
                        label=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input
                      loading={isGettingValueById}
                      placeholder="e.g Stanford University"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="">Start Date</FormLabel>
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
                );
              }}
            />
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
          <div className="mt-8">
            <Button
              loading={isCreating || isUpdating}
              type="submit"
              icon={<Plus />}
              variant="outline"
              className="flex items-center rounded-lg"
            >
              <Plus size={18} strokeWidth={3} />
              {educationsId ? ' Update education' : ' Add new education'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
