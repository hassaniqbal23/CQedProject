'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Calendar, GraduationCap } from 'lucide-react';

interface Job {
  id: string;
  company: string;
  role: string;
  duration: string;
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
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
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
                  <GraduationCap color="#1D1E1E" size={25} />
                </div>
                <div key={job.id} className="p-3 text-left ">
                  <h3 className="font-semibold text-base text-[#393939]">
                    {job.company}
                  </h3>
                  <div className="flex items-center mt-1">
                    <p className="text-sm">{job.role}</p>
                    <p className="text-sm flex items-center ml-5">
                      <Calendar size={15} className="mr-2" />
                      {job.duration}
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
