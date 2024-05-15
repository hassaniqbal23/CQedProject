import React from 'react';
import { Input } from '../input/input';
import DatePiker from '../date-picker/date-picker';
import { SelectCountry } from '../select-v2/select-v2-components';
// import { EmailInput } from '@/components/common/From/TagsInput/TagInput';
import { SelectLanguage } from '../select-v2/select-v2-components';
import { Textarea } from '../textarea/textarea';
import ChipSelector from '../ChipSelect/ChipSelector';
import MultipleSelector from '@/components/common/From/MultiSelect';
interface TeacherFormProps {
  title: string;
  name: string;
}

export const TeacherForm: React.FC<TeacherFormProps> = ({ title, name }) => {
  return (
    <div className="p-4 border border-red-500 flex gap-4 flex-col ">
      <h2>{title}</h2>
      <div className="md:grid md:grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-4">
        <div className="w-full ">
          <label htmlFor="fullName">Full Name</label>
          <Input placeholder="Enter your full name" />
        </div>
        <div className="w-full">
          <label htmlFor="nickname">Set a Nickname</label>
          <Input placeholder="Enter your Nickname" type="text" />
        </div>
        <div className="w-full">
          <label htmlFor="birthday">Birthday</label>
          <DatePiker />
        </div>
        <div className="w-full">
          <SelectCountry className="py-2" />
        </div>
        <div className="w-full">
          <label htmlFor="">Email</label>
          <Input type="email" placeholder="Enter your email" />
        </div>
        <div className="w-full ">
          <label htmlFor="fullName">Phone Number</label>
          <Input placeholder="Enter your Number" type="number" />
        </div>
        <div className="w-full ">
          <label htmlFor="fullName">Skype </label>
          <Input placeholder="Enter your skype ID" type="number" />
        </div>
        <div className="w-full py-2">
          <SelectLanguage
            countryCode="odwwqdjiowd"
            options={[
              { value: 'English', label: 'English' },
              { value: 'Udru', label: 'Udru' },
              { value: 'russian', label: 'Russian' },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 w-full gap-4">
          <div className="w-full ">
            <label htmlFor="fullName">gender </label>
            <ChipSelector
              options={[
                {
                  label: 'Male',
                  value: 'Male',
                  render: (data: any) => <div>{data.label}</div>,
                },
                {
                  label: 'Female',
                  value: 'Female',
                  render: (data: any) => <div>{data.label}</div>,
                },
                {
                  label: 'Non-binary',
                  value: 'Non-binary',
                  render: (data: any) => <div>{data.label}</div>,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 w-full gap-4">
        <div className="w-full ">
          <label htmlFor="fullName">Write about yourself </label>
          <Textarea placeholder="Tell us about you. What makes you smile!" />
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-4 ">
        <div className="w-full  ">
          <label htmlFor="fullName">Education</label>
          <MultipleSelector
            options={[
              {
                label: 'Associate Degree',
                value: 'Associate Degree',
              },
              {
                label: "Bachelor's Degree",
                value: "Bachelor's Degree",
              },
              {
                label: "Master's Degree",
                value: "Master's Degree",
              },
            ]}
            placeholder="Your Education"
          />
        </div>

        <div className="w-full  ">
          <label htmlFor="fullName">Education</label>
          <MultipleSelector
            options={[
              {
                label: 'Associate Degree',
                value: 'Associate Degree',
              },
              {
                label: "Bachelor's Degree",
                value: "Bachelor's Degree",
              },
              {
                label: "Master's Degree",
                value: "Master's Degree",
              },
            ]}
            placeholder="Your Education"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;
