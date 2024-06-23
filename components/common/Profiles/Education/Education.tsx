'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Calendar, GraduationCap } from 'lucide-react';
import { Typography } from '../../Typography/Typography';
import Image from 'next/image';

interface Job {
  id: string;
  educationLevel: string;
  fieldOfStudy: string;
  countryCode: string;
  institution: string;
  startDate: string;
  endDate: string;
}

interface WorkHistoryProps {
  jobs: Job[];
  title: string;
}

export const ProfileEducation: React.FC<WorkHistoryProps> = ({
  jobs,
  title,
}) => {
  return (
    <Card>
      <div className="ml-5 mt-3">
        <Typography variant={'h3'} weight={'semibold'}>
          {title}
        </Typography>
      </div>
      <CardContent>
        {jobs.map((job, index: number, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              key={index}
              className={`${isLast ? 'border-b-0' : 'border-b py-1'}`}
            >
              <div className="flex items-center">
                <div className="bg-primary-50 p-2 rounded-md">
                  <Image
                    src={'/graduate.svg'}
                    alt={'icon'}
                    width={28}
                    height={28}
                  ></Image>
                </div>
                <div key={job.id} className="p-3 text-left ">
                  <h3 className="font-semibold text-base text-[#393939]">
                    {job.educationLevel} degree in {job.fieldOfStudy}
                  </h3>
                  <div>
                    <Typography
                      variant={'h6'}
                      weight={'semibold'}
                      className="text-[#393939]"
                    >
                      {job.institution}
                    </Typography>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-[#393939] font-medium">
                      {job.countryCode}
                    </p>
                    <p className="text-sm flex items-center ml-5">
                      <Calendar size={15} className="mr-2 font-medium" />
                      {job.startDate} - {job.endDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

ProfileEducation.displayName = 'ProfileEducation';
