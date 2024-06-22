'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Calendar, Gift } from 'lucide-react';
import { Accordion, AccordionItem } from '@/components/ui';
import { Typography } from '../../Typography/Typography';

interface Job {
  id: string;
  title: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface WorkHistoryProps {
  jobs: Job[];
  title: string;
}

export const ProfileWorkHistory: React.FC<WorkHistoryProps> = ({
  jobs,
  title,
}) => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {jobs.map((job, index: number, array) => {
            const isLast = index === array.length - 1;
            return (
              <div key={index}>
                <AccordionItem
                  value={job.id}
                  className={`${isLast ? 'border-b-0' : ''} `}
                >
                  {' '}
                  <div className="flex items-center">
                    <div className="bg-primary-50 p-2 rounded-md">
                      <div className="bg-primary-50 p-2 rounded-md"></div>
                      <Gift color="#4146B8" size={25} />
                    </div>

                    <div key={job.id} className="p-4 text-left ">
                      <h3 className="font-semibold text-base text-[#393939]">
                        {job.title}
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
                        <p className="text-sm font-medium">{job.location}</p>
                        <p className="text-sm flex items-center ml-5">
                          <Calendar size={15} className="mr-2 font-medium" />
                          {job.startDate} - {job.endDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionItem>
                educationLevel
              </div>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};

ProfileWorkHistory.displayName = 'ProfileWorkHistory';
