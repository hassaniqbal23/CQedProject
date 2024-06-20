'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Calendar, Gift } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';

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
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <div className="bg-primary-50 p-2 rounded-md">
                        <Gift color="#4146B8" size={25} />
                      </div>

                      <div key={job.id} className="p-4 text-left ">
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
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};

ProfileWorkHistory.displayName = 'ProfileWorkHistory';
