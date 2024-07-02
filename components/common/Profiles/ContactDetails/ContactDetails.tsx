import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Typography } from '../../Typography/Typography';

interface ContactDetails {
  title: string;
  content: string;
  icon: LucideIcon;
}

interface ContactDetailsProps {
  details: ContactDetails[];
  title: string;
}

export const ProfileContactDetails: React.FC<ContactDetailsProps> = ({
  details,
  title,
}) => {
  return (
    <Card>
      <div className="ml-5 mt-3">
        <Typography variant={'h4'} weight={'semibold'}>
          {title}
        </Typography>
      </div>

      <CardContent>
        {details?.map((item: ContactDetails, index: number) => {
          return (
            <div
              key={index}
              className={`flex items-center my-1 rounded-2xl break-all ${index === 0 ? 'border-b rounded-none' : ''}`}
            >
              <div className="bg-[#ECEDF8] p-2 rounded-full">
                <item.icon strokeWidth={1.2} className="text-[#2183C4]" />
              </div>
              <div className="p-2 text-left ml-2">
                <h2 className="font-semibold text-sm">{item.title}</h2>
                <h3 className="font-sm text-sm text-[#393939] flex flex-wrap">
                  {item.content}
                </h3>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

ProfileContactDetails.displayName = 'ProfileContactDetails';
