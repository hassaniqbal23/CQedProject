import { Separator } from '@radix-ui/react-select';
import * as z from 'zod';

import { Typography } from '../Typography/Typography';
import ImageUpload from '../ImageUpload/ImageUpload';
import { FormField, FormMessage, Input, Form, Button } from '@/components/ui';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectV2 } from '@/components/ui/select-v2/select-v2';

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
});

export interface CreateCommunityFormProps {
  CommunityTypeOptions: any[];
  onFormSubmit?: (data: any) => void;
  loading?: boolean;
}

let QuillChangeTimeout: any = null;

const CreateCommunityForm = (props: CreateCommunityFormProps) => {
  const deleteProfile = (id: number) => {
    console.log(id);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      CommunityTypeId: 0,
    },
  });

  const uploadProfile = (value: FormData) => {
    console.log(value);
  };

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
            loading={false}
            attachmentFilepath={''}
            attachmentID={23}
            deleteProfile={deleteProfile}
            uploadProfile={uploadProfile}
          />
        </div>
        <Typography
          variant="h4"
          children="Community Name"
          weight="bold"
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
          variant="h4"
          children="Description"
          weight="bold"
          className="mt-6 mb-2"
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <>
              <ReactQuill
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

        {/* <Typography
        variant="h4"
        children="Add Friends"
        weight="bold"
        className=" my-2"
      /> */}
        {/* <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <Select defaultValue={'defaultValue'}>
            <SelectTrigger className={` p-6`}>
              <SelectValue placeholder={'Add Friends'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      /> */}
        {/* <ChipSelector
        rounded={true}
        variant="secondary-outlined"
        options={[
          {
            label: 'Sophia Andrews',
            value: 'Sophia Andrews',
            render: (data: any) => (
              <div className=" text-sm flex ">
                <Avatar className="w-6 h-6 mr-1">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {data.label}
              </div>
            ),
          },
        ]}
      /> */}
        <Typography
          variant="h4"
          children="Community Type"
          weight="bold"
          className="my-2"
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
