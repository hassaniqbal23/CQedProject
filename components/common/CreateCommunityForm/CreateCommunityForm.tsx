import React, { useState } from 'react';
import { Separator } from '@radix-ui/react-select';
import * as z from 'zod';
import { Typography } from '../Typography/Typography';
import ImageUpload from '../ImageUpload/ImageUpload';
import { FormField, FormMessage, Input, Form, Button } from '@/components/ui';
import 'react-quill/dist/quill.snow.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectV2 } from '@/components/ui/select-v2/select-v2';
import MultipleSelector from '../From/MultiSelect';
import Image from 'next/image';
import { deleteImage, uploadImage } from '@/app/api/communities';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Name should be at least 3 characters',
  }),
  description: z.string().min(3, {
    message: 'Description should be at least 3 characters',
  }),
  CommunityTypeId: z.number().min(1, {
    message: 'Please select a community type',
  }),
  students: z.array(z.number()),
});

export interface CreateCommunityFormProps {
  CommunityTypeOptions: any[];
  onFormSubmit?: (data: any) => void;
  loading?: boolean;
  students?: any[];
  isLoadingAllStudents?: boolean;
}

let QuillChangeTimeout: any = null;

const CreateCommunityForm = (props: CreateCommunityFormProps) => {
  const [attachment, setAttachment] = useState<any>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      CommunityTypeId: 0,
    },
  });

  const { mutate: uploadCommunityImage, isLoading: isUploadingCommunity } =
    useMutation((file: FormData) => uploadImage(file), {
      onSuccess: (res) => {
        setAttachment(res.data.data);
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    });

  const { mutate: deleteCommunityImage, isLoading: isDeletingCommunity } =
    useMutation((id: number) => deleteImage(id), {
      onSuccess: (res) => {
        setAttachment(null);
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (props.onFormSubmit) {
      props.onFormSubmit(data);
    }
  };

  return (
    <Form {...form}>
      <form className="m-10" onSubmit={form.handleSubmit(onSubmit)}>
        <Typography
          variant="h2"
          children="Create your Community"
          weight="medium"
        />
        <Separator className="h-[1px] w-full bg-[#CDD0D7] my-5 " />
        <div className="mt-8 flex  items-center w-1/5">
          <ImageUpload
            loading={isUploadingCommunity || isDeletingCommunity || false}
            attachmentFilepath={attachment?.file_path}
            attachmentID={attachment?.id}
            deleteProfile={deleteCommunityImage}
            uploadProfile={uploadCommunityImage}
          />
        </div>
        <Typography
          variant="h5"
          children="Community Name"
          weight="semibold"
          className="mt-6 mb-2"
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <>
              <Input {...field} placeholder="Enter your community name" />
              <FormMessage className="mt-2" />
            </>
          )}
        />

        <Typography
          variant="h5"
          children="Description"
          weight="semibold"
          className="mt-6 mb-2"
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <>
              <ReactQuill
                style={{ height: '78px', marginBottom: '30px' }}
                theme="snow"
                placeholder="Community Description, You can write guidelines, rules or any other thing."
                onBlur={() => {
                  field.onBlur();
                }}
                onChange={(value) => {
                  clearTimeout(QuillChangeTimeout);
                  QuillChangeTimeout = setTimeout(() => {
                    field.onChange(value);
                  }, 500);
                }}
              />
              <FormMessage className="mt-2" />
            </>
          )}
        />

        <Typography
          variant="h5"
          children="Community Type"
          weight="semibold"
          className="my-2 mt-16"
        />
        <FormField
          control={form.control}
          name="CommunityTypeId"
          render={({ field }) => (
            <>
              <SelectV2
                options={
                  props.CommunityTypeOptions.map((c) => {
                    return {
                      label: c.name,
                      value: c.id,
                    };
                  }) as { label: string; value: number }[]
                }
                onChange={(newValue) => {
                  field.onChange((newValue as any).value);
                }}
                placeholder="Community Type"
              />
              <FormMessage className="mt-2" />
            </>
          )}
        />
        <Typography
          variant="h4"
          children="Community Type"
          weight="bold"
          className="my-3"
        />
        <FormField
          control={form.control}
          name="students"
          render={({ field }) => (
            <MultipleSelector
              placeholder="Select language"
              options={[
                {
                  label: 'India',
                  value: 'india',
                  disable: false,
                  render: () => {
                    return (
                      <div className="flex gap-1 items-center">
                        <Image
                          height={30}
                          width={30}
                          src={'/countries/india.svg'}
                          alt="flag"
                        />
                        <span className="ml-2">India</span>
                      </div>
                    );
                  },
                },
                {
                  label: 'Pakistan',
                  value: 'pakistan',
                  disable: false,
                  render: () => {
                    return (
                      <div className="flex gap-1 items-center">
                        <Image
                          height={30}
                          width={30}
                          src={'/countries/pakistan.svg'}
                          alt="flag"
                        />
                        <span className="ml-2">Pakistan</span>
                      </div>
                    );
                  },
                },
                {
                  label: 'UK',
                  value: 'uk',
                  disable: false,
                  render: () => {
                    return (
                      <div className="flex gap-1 items-center">
                        <Image
                          height={30}
                          width={30}
                          src={'/countries/uk.svg'}
                          alt="flag"
                        />
                        <span className="ml-2">UK</span>
                      </div>
                    );
                  },
                },
              ]}
            />
          )}
        />

        <div className="mt-6 flex">
          <Button
            type="submit"
            className="ml-auto"
            loading={props.loading}
            disabled={props.loading}
          >
            Create Community
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { CreateCommunityForm };
