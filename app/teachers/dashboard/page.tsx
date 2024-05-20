'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
import { format } from 'date-fns';
import DasboardDataTable from '@/components/ui/TeacherDashboardDataTable/TeacherDashboardDataTable';
import { getPieChartOptions } from '@/lib/utils';
import AdminCharts from '@/components/common/AdminCharts';
import BirthdayCard from '@/components/common/BirthdayCard/BirthdayCard';
import TopStudentsCard from '@/components/common/TopStudentsCards/TopStudentsCard';

const initialBar = {
  data: [],
  error: undefined,
  loading: true,
  vertical: false,
};

const Dashboard = () => {
  const [classNamerooms, setclassNamerooms] = useState<any[]>([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [inviteStudentModal, setInviteStudentModal] = useState(false);
  const [pieChart, setPieChart] = useState<any>(initialBar);

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
        // Set classNamerooms data here if needed
        // setclassNamerooms(data);
      },
    }
  );

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL_STUDENT' });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTime]);

  const formattedDate = format(dateTime, 'd MMM');
  const formattedDay = format(dateTime, 'EEEE');
  const formattedTime = format(dateTime, 'HH:mm');

  const columns = [
    { label: 'Class name', key: 'name' },
    { label: 'Students', key: 'students' },
    { label: 'Status', key: 'Status' },
  ];

  const getPieChartData = () => {
    const chartData = [
      { value: 1048, name: 'Advanced' },
      { value: 735, name: 'Intermediate' },
      { value: 580, name: 'Basic' },
      { value: 484, name: 'Proficient' },
    ];

    const pieOptions = getPieChartOptions(chartData);

    setPieChart({
      data: pieOptions,
      error: false,
      loading: false,
      vertical: false,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getPieChartData();
    }, 2000);
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row mb-4">
        <div className="flex items-center mb-2 lg:mb-0">
          <div className="flex flex-col bg-[#F5F6F5] items-center p-2 rounded-md">
            <div className="font-bold text-[#394245]">{formattedDate}</div>
            <div className="font-semibold text-[#394245]">{formattedTime}</div>
          </div>
          <div className="font-bold text-[#394245] ml-3 text-2xl">
            {formattedDay}
          </div>
        </div>
        <div className="flex ml-auto space-x-2">
          <Button size={'md'} className="rounded-xl">
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
          <div className="flex mt-10">
            <div className="container mx-auto px-4 py-8 border rounded">
              <div className="flex justify-between items-center mb-8">
                <Typography variant="h2" weight="bold">
                  Overall Class Performance
                </Typography>
                {/* <div className="cursor-pointer">View Details</div> */}
              </div>

              <div className="flex flex-col">
                <Typography
                  variant="h4"
                  weight="semibold"
                  className="text-gray-600"
                >
                  Skill Proficiency
                </Typography>
                <div className="flex items-center gap-4">
                  <div className="w-1/2">
                    <AdminCharts
                      xLabel={pieChart.labels}
                      loading={pieChart.loading}
                      options={pieChart.data}
                    />
                  </div>
                  <div className="grid grid-cols-2 h-52 content-center ">
                    <div className="flex gap-2 items-center">
                      <span className="p-2 rounded-full h-1 w-1 bg-blue-500"></span>
                      <div className="flex flex-col px-4 py-4 w-1/2">
                        <Typography
                          variant="h4"
                          weight="regular"
                          className="text-gray-500"
                        >
                          Advanced
                        </Typography>
                        <Typography variant="h2" weight="semibold">
                          50%
                        </Typography>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="p-2 rounded-full h-1 w-1 bg-green-500"></span>
                      <div className="flex flex-col px-4 py-4 w-1/2">
                        <Typography
                          variant="h4"
                          weight="regular"
                          className="text-gray-500"
                        >
                          Intermediate
                        </Typography>
                        <Typography variant="h2" weight="semibold">
                          30%
                        </Typography>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="p-2 rounded-full h-1 w-1  bg-yellow-500"></span>
                      <div className="flex flex-col px-4 py-4 w-1/2">
                        <Typography
                          variant="h4"
                          weight="regular"
                          className="text-gray-500"
                        >
                          Basic
                        </Typography>
                        <Typography variant="h2" weight="semibold">
                          10%
                        </Typography>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="p-2 rounded-full h-1 w-1 bg-red-400 "></span>
                      <div className="flex flex-col px-4 py-4 w-1/2">
                        <Typography
                          variant="h4"
                          weight="regular"
                          className="text-gray-500"
                        >
                          Proficient
                        </Typography>
                        <Typography variant="h2" weight="semibold">
                          20%
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Typography variant="h3" weight="semibold">
                Top Students
              </Typography>

              <div className="flex flex-col mt-2">
                {[1, 2, 3, 4].map((item, index) => {
                  return (
                    <div className="border-b" key={index}>
                      <TopStudentsCard
                        name="name"
                        buttonText={
                          index === 0
                            ? 'Lagging'
                            : index === 1
                              ? 'On Track'
                              : index === 2
                                ? 'Ahead'
                                : 'Completed'
                        }
                        proficiency={
                          index === 0
                            ? 'Basic'
                            : index === 1
                              ? 'Intermediate'
                              : index === 2
                                ? 'Proficient'
                                : 'Advanced'
                        }
                        profile="/assets/profile/profile.svg"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
              buttonProps={{ size: 'sm' }}
            />
          ))}
          <Link
            href={''}
            className="text-indigo-500 font-semibold flex justify-center p-2"
          >
            Explore more communities
            <MoveRight className="ml-2 justify-center items-center" />
          </Link>
          <div className="bg-[#FFFBED] p-4 w-full mt-4 rounded ">
            <Typography
              variant="h3"
              weight="semibold"
              className="flex items-center gap-2"
            >
              <Image src={'/cake.png'} alt="cake" width={20} height={20} />{' '}
              Upcoming birthdays
            </Typography>
            <div className="mt-3">
              {[1, 2, 3, 4].map((_, index) => {
                return (
                  <div className="border-b border-[#F1ECDA]" key={index}>
                    <BirthdayCard
                      birthDate="Today"
                      buttonText="Wish her"
                      name="Shuli YU"
                      profile="/assets/profile/profile.svg"
                      showWishButton={index === 1}
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
