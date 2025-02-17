import React, { useState } from 'react';
import { Separator } from '@radix-ui/react-select';
import * as z from 'zod';
import { Typography } from '../Typography/Typography';
import ImageUpload from '../ImageUpload/ImageUpload';
import {
  FormField,
  FormMessage,
  Input,
  Form,
  Button,
  SelectInput,
} from '@/components/ui';
import 'react-quill/dist/quill.snow.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteImage, uploadImage } from '@/app/api/communities';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { useGlobalState } from '@/app/globalContext/globalContext';
import MultipleSelector from '../From/MultiSelect';
import { ICommunityType } from '@/types/community';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

const tempalte = `<h3>About</h3>
<p>Write about your community</p>
<h3>Guidelines</h3>
<ul>
  <li>Start writing your guidelines</li>
</ul>
<h3>Rules</h3>
<ul>
  <li>Start writing your rules</li>
</ul>
`;

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
  attachmentId: z
    .number({
      message: 'Please upload an image',
    })
    .min(1, {
      message: 'Please upload an image',
    }),
  users: z.array(z.number()).optional(),
});

export interface CreateCommunityFormProps {
  CommunityTypeOptions: ICommunityType[];
  onFormSubmit?: (data: any) => void;
  loading?: boolean;
  students?: any[];
  isLoadingAllStudents?: boolean;
  isFetchingCommunityType?: boolean;
}

let QuillChangeTimeout: any = null;

const CreateCommunityForm = (props: CreateCommunityFormProps) => {
  const { myPenpals, isFetchingMyPenPals } = useGlobalState();
  const [attachment, setAttachment] = useState<any>();
  const instance = React.useRef<any>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ``,
      CommunityTypeId: 0,
      users: [],
    },
  });

  const { mutate: uploadCommunityImage, isLoading: isUploadingCommunity } =
    useMutation((file: FormData) => uploadImage(file), {
      onSuccess: (res) => {
        setAttachment(res?.data?.data[0]);
        form.setValue('attachmentId', res?.data?.data[0]?.id);
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
      props.onFormSubmit({ ...data });
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

        <FormField
          control={form.control}
          name="attachmentId"
          render={({ field }) => (
            <>
              <div className="flex flex-col">
                <div className=" flex items-center w-1/5">
                  <ImageUpload
                    loading={
                      isUploadingCommunity || isDeletingCommunity || false
                    }
                    attachmentFilepath={attachment && attachment?.file_path}
                    attachmentID={attachment?.id}
                    deleteProfile={deleteCommunityImage}
                    uploadProfile={uploadCommunityImage}
                    title=""
                  />
                </div>
                <div className="mt-2">
                  {' '}
                  <Typography variant={'h5'} weight={'semibold'}>
                    Choose your Cover Image
                  </Typography>
                </div>
              </div>
              <FormMessage className="mt-2" />
            </>
          )}
        />
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
              <Input
                className="text-sm"
                {...field}
                placeholder="Enter your community name"
              />
              <FormMessage className="mt-2" />
            </>
          )}
        />

        <div className="flex items-center py-3 mt-2">
          <Typography
            variant="h5"
            children="Description"
            weight="semibold"
            className=""
          />
          <div className="ml-auto">
            <Button
              size="xs"
              type="button"
              onClick={() => {
                form.setValue('description', tempalte);
              }}
            >
              Load Template
            </Button>
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <>
              <div className="">
                <ReactQuill
                  theme="snow"
                  className="quill-container-height"
                  placeholder="Write your description, guidelines, and rules here... or you can load template"
                  onBlur={() => {
                    field.onBlur();
                  }}
                  value={form.watch('description')}
                  onChange={(value) => {
                    clearTimeout(QuillChangeTimeout);
                    QuillChangeTimeout = setTimeout(() => {
                      field.onChange(value);
                    }, 500);
                  }}
                />
              </div>

              <FormMessage className="mt-2" />
            </>
          )}
        />

        <Typography
          variant="h5"
          children="Community Type"
          weight="semibold"
          className="my-2 mt-4"
        />
        <FormField
          control={form.control}
          name="CommunityTypeId"
          render={({ field }) => {
            return (
              <>
                <SelectInput
                  loading={props.isFetchingCommunityType}
                  onSelect={(val) => field.onChange(Number(val))}
                  defaultValue={`${field.value}`}
                  options={
                    props.CommunityTypeOptions.map((c) => {
                      return {
                        label: c.name,
                        value: `${c.id}`,
                      };
                    }) as { label: string; value: string }[]
                  }
                  placeholder="Community Type"
                />
                <FormMessage className="mt-2" />
              </>
            );
          }}
        />
        <Typography
          variant="h5"
          children="Add Friends"
          weight="semibold"
          className="my-2 mt-4"
        />
        <FormField
          control={form.control}
          name="users"
          render={({ field }) => (
            <>
              <MultipleSelector
                className="p-4 bg-[#F8F9FB]"
                onChange={(v) => {
                  if (v) {
                    const list = v.map((i) => i.value);
                    field.onChange(list);
                  }
                }}
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
                options={
                  myPenpals?.map((penpal: any) => ({
                    label: penpal?.friend?.profile?.full_name,
                    value: penpal?.friend?.id,
                  })) || []
                }
                placeholder="Select friends "
              />
              <FormMessage className="mt-2" />
            </>
          )}
        />

        <div className="mt-6 flex">
          <Button
            variant={'outline'}
            type="submit"
            className="ml-auto border-0 bg-primary-50 rounded-full px-10"
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
