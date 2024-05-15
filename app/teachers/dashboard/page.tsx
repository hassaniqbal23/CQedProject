'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { Button } from '@/components/ui';
import { SendEmail } from '@/components/index';
import { useMutation, useQuery } from 'react-query';
import { Invite } from '@/app/api/invitations';
import { getInvitedTeachers } from '@/app/api/teachers';
import { CircleUserRound, MoveRight } from 'lucide-react';
import WelcomeHeader from '@/components/common/welcomeHeader/WelcomeHeader';

import { Typography } from '@/components/common/Typography/Typography';
import Coummuntiycard from '@/components/common/Communitycard/CommunityCard';
import Link from 'next/link';

import { outlined } from '@/components/ui/button/button.stories';
import DasboardDataTable from '@/components/ui/TeacherDashboardDataTable/TeacherDashboardDataTable';

const Dashboard = () => {
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [dateTime, setDateTime] = useState(moment());
  const [inviteStudentModal, setInviteStudentModal] = useState(false);

  const { mutate: schoolInvite, isLoading } = useMutation(
    (studentData: { emails: string; type: string }) => Invite(studentData),
    {
      onSuccess: (res) => {
        setInviteStudentModal(false);
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const { data, isLoading: isFetchingInvitedSchools } = useQuery(
    ['getInvitedSchools'],
    () => getInvitedTeachers(),
    {
      onSuccess: (data) => {
        // Set classrooms data here if needed
        // setClassrooms(data);
      },
    }
  );

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL_STUDENT' });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTime]);

  const formattedDate = dateTime.format('D MMM');
  const formattedDay = dateTime.format('dddd');
  const formattedTime = dateTime.format('HH:mm');

  const columns = [
    { label: 'Class name', key: 'name' },
    { label: 'Students', key: 'students' },
    { label: 'Status', key: 'Status' },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row mb-4">
        <div className="flex items-center mb-2 lg:mb-0">
          <div className="flex flex-col bg-[#F5F6F5] items-center p-1 rounded-md">
            <div className="font-bold text-[#394245]">{formattedDate}</div>
            <div className="font-semibold text-[#394245]">{formattedTime}</div>
          </div>
          <div className="font-bold text-[#394245] ml-3 text-2xl">
            {formattedDay}
          </div>
        </div>
        <div className="flex ml-auto space-x-2">
          <Button className="rounded-xl">
            <Image alt="logo" width={18} height={18} src="/check.svg" />
            Create account
          </Button>
          <Button className="bg-[#ECEDF8] text-[#394245] rounded-xl">
            <CircleUserRound className="text-[#394245]" />
            Create Classroom
          </Button>
          <Button
            className="bg-[#ECEDF8] text-[#394245] rounded-xl"
            onClick={() => setInviteStudentModal(true)}
          >
            <Image alt="logo" width={21} height={21} src="/community.svg" />
            Invite Students
          </Button>
        </div>
      </div>
      <hr className="mb-4" />
      <WelcomeHeader
        title="Welcome Moin!"
        description="Ready to create a culturally intelligent class"
      />
      <div className="flex flex-col lg:flex-row w-full mt-6">
        <div className="w-full lg:w-3/5 mb-4 lg:mb-0">
          <Typography variant="h4" weight="semibold" className="mb-2">
            Your Classrooms
          </Typography>
          <DasboardDataTable columns={columns} data={[]} />
        </div>
        <div className="w-full lg:w-2/5 lg:ml-4">
          <Typography variant="h4" weight="semibold" className="mb-6">
            Suggested Communities for You
          </Typography>
          {[1, 2, 3].map((_, index) => (
            <Coummuntiycard
              key={index}
              totalMembers={'330'}
              totalDiscussions={14000}
              title={'Friends Globally'}
              imageSrc={'/globally.jpeg'}
              buttonProps={outlined}
            />
          ))}
          <Link
            href={''}
            className="text-indigo-500 font-semibold flex justify-center p-2"
          >
            Explore more communities
            <MoveRight className="ml-2 justify-center items-center" />
          </Link>
        </div>
      </div>
      <SendEmail
        inviteLoading={isLoading}
        setOpen={setInviteStudentModal}
        open={inviteStudentModal}
        onSubmit={onSubmit}
        inviteButtonTitle={'Invite Students'}
        headerTitle={'Invite Students'}
      />
    </div>
  );
};

export default Dashboard;
