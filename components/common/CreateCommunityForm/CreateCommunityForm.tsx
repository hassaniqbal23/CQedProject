import { Separator } from '@radix-ui/react-select';
import { Typography } from '../Typography/Typography';
import ImageUpload from '../ImageUpload/ImageUpload';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';

const CreateCommunityForm = () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  const [value, setValue] = useState('');

  const deleteProfile = (id: number) => {
    console.log(id);
  };

  const uploadProfile = (value: FormData) => {};

  return (
    <div className="m-10">
      <Typography variant="h1" children="Create your Community" weight="bold" />
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
      <Input placeholder="Enter your community name" />

      <Typography
        variant="h4"
        children="Description"
        weight="bold"
        className="mt-6 mb-2"
      />
      <ReactQuill theme="snow" value={value} onChange={setValue} />

      <Typography
        variant="h4"
        children="Add Friends"
        weight="bold"
        className=" my-2"
      />
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
      <ChipSelector
        rounded={true}
        variant="secondary-outlined"
        options={[
          {
            label: 'Sophia Andrews',
            value: 'Sophia Andrews',
            render: (data: any) => (
              <div className=" text-sm flex ">
                <Avatar className='w-6 h-6 mr-1'>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback >CN</AvatarFallback>
                </Avatar>
                {data.label}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export { CreateCommunityForm };
