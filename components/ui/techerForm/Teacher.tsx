import React from 'react';
import { Input } from '../input/input';
import DatePiker from '../date-picker/date-picker';
import { SelectCountry } from '../select-v2/select-v2-components';
import { Textarea } from '../textarea/textarea';
import ChipSelector from '../ChipSelect/ChipSelector';
import MultipleSelector from '@/components/common/From/MultiSelect';
interface TeacherFormProps {
  title: string;
}

export const TeacherForm: React.FC<TeacherFormProps> = ({ title }) => {
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
          <label htmlFor="fullName">Language </label>
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
          <label htmlFor="fullName">Skills</label>
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

        <div className="w-full  ">
          <label htmlFor="fullName">Add Work History</label>
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
          <label htmlFor="fullName">Certificates</label>
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
          <div className="w-1/2/ ">
            <label htmlFor="fullName">Currently Working with. </label>
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

export default TeacherForm;
