import React from 'react';
import { Input } from '../../../ui/input/input';
import DatePiker from '../../../ui/date-picker/date-picker';
import { SelectCountry } from '../../../ui/select-v2/select-v2-components';
import { Textarea } from '../../../ui/textarea/textarea';
import ChipSelector from '../../../ui/ChipSelect/ChipSelector';
import MultipleSelector from '@/components/common/From/MultiSelect';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { Typography } from '../../Typography/Typography';
export interface TeacherFormProps {
  title: string;
  buttonOnClick: () => void;
}
export const TeacherForm: React.FC<TeacherFormProps> = ({
  title,
  buttonOnClick,
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col ">
      <div>
        <Button
          onClick={buttonOnClick}
          className=" flex items-center gap-2 text-base font-semibold bg-transparent text-[#3C3C3C] ml-[-13px] "
        >
          {' '}
          <ArrowLeft /> Back to Profile
        </Button>
      </div>
      <Typography variant="h3" weight="semibold">
        {title}
      </Typography>
      <div className="md:grid md:grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-4">
        <div className="w-full flex flex-col gap-3 ">
          <label htmlFor="fullName" className="font-semibold text-lg">
            Full Name
          </label>
          <Input placeholder="Enter your full name" />
        </div>
        <div className="w-full  flex flex-col gap-3 ">
          <label htmlFor="nickname" className="font-semibold text-lg">
            Set a Nickname
          </label>
          <Input placeholder="Enter your Nickname" type="text" />
        </div>
        <div className="w-full flex flex-col gap-3 ">
          <label htmlFor="birthday" className="font-semibold text-lg">
            Birthday
          </label>
          <DatePiker />
        </div>
        <div className="w-full flex flex-col gap-3 ">
          <SelectCountry className="mt-4 " />
        </div>
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="" className="font-semibold text-lg">
            Email
          </label>
          <Input type="email" placeholder="Enter your email" />
        </div>
        <div className="w-full  flex flex-col gap-3 ">
          <label htmlFor="fullName" className="font-semibold text-lg">
            Phone Number
          </label>
          <Input placeholder="Enter your Number" type="number" />
        </div>
        <div className="w-full  flex flex-col gap-3 ">
          <label htmlFor="fullName" className="font-semibold text-lg">
            Skype{' '}
          </label>
          <Input placeholder="Enter your skype ID" type="number" />
        </div>
        <div className="w-full py-2 flex flex-col gap-3 ">
          <label htmlFor="fullName" className="font-semibold text-lg">
            Language{' '}
          </label>
          <MultipleSelector
            options={[
              { value: 'English', label: 'English' },
              { value: 'Udru', label: 'Udru' },
              { value: 'russian', label: 'Russian' },
            ]}
            placeholder="Add language "
          />
        </div>
        <div className="grid grid-cols-1 w-full gap-4">
          <div className="w-full  flex flex-col gap-3 ">
            <label htmlFor="fullName" className="font-semibold text-lg b">
              gender{' '}
            </label>
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
        <div className="w-full  flex flex-col gap-3 ">
          <label htmlFor="fullName" className="font-semibold text-lg">
            Write about yourself{' '}
          </label>
          <Textarea placeholder="Tell us about you. What makes you smile!" />
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-4 ">
        <div className="w-full   flex flex-col gap-3 ">
          <label htmlFor="fullName" className="font-semibold text-lg">
            Skills
          </label>
          <MultipleSelector
            options={[
              {
                value: 'communication-skills',
                label: 'Communication Skills',
              },
              {
                value: 'problem-solving',
                label: 'Problem-Solving',
              },
              {
                value: 'teamwork',
                label: 'Teamwork',
              },
            ]}
            placeholder="Add Skills"
          />
        </div>

        <div className="w-full  flex flex-col gap-3  ">
          <label htmlFor="fullName" className="font-semibold text-lg">
            Add Work History
          </label>
          <MultipleSelector
            options={[
              {
                value: 'software-engineer',
                label: 'Software Engineer',
              },
              {
                value: 'project-manager',
                label: 'Project Manager',
              },
              {
                value: 'data-analyst',
                label: 'Data Analyst',
              },
            ]}
            placeholder="Add Work History"
          />
        </div>
        <div className="w-full  flex flex-col gap-3  ">
          <label htmlFor="fullName" className="font-semibold text-lg">
            Education
          </label>
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
        <div className="w-full  flex flex-col gap-3  ">
          <label htmlFor="fullName" className="font-semibold text-lg">
            Certificates
          </label>
          <MultipleSelector
            options={[
              {
                value: 'certified-scrum-master',
                label: 'Certified Scrum Master',
              },
              {
                value: 'aws-certified-solutions-architect',
                label: 'AWS Certified Solutions Architect',
              },
              {
                value: 'google-analytics-certified',
                label: 'Google Analytics Certified',
              },
            ]}
            placeholder="Your Education"
          />
        </div>
        <div className="grid grid-cols-1 w-full gap-4 pb-12">
          <div className="w-1/2/  flex flex-col gap-3 ">
            <label htmlFor="fullName" className="font-semibold text-lg">
              Currently Working with.{' '}
            </label>
            <MultipleSelector
              options={[
                {
                  value: 'amazon-office',
                  label: 'Amazon Office',
                },
                {
                  value: 'microsoft-campus',
                  label: 'Microsoft Campus',
                },
                {
                  value: 'googleplex',
                  label: 'Googleplex',
                },
              ]}
              placeholder="Add your working space name"
            />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};
