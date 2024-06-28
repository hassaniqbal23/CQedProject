import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Typography } from '../../Typography/Typography';
import { ArrowUpRight } from 'lucide-react';
import { Image } from '../../Image';

interface WorkExperience {
  companyName?: string;
}

interface CurrentlyWorkingProps {
  data: {
    workExperience?: WorkExperience[];
  };
}

export const CurrentlyWorking: FC<CurrentlyWorkingProps> = ({ data }) => {
  const currentlyWorking = data?.workExperience?.[0];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Currently Working at</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4 px-4 text-primary-500 text-center rounded-xl text-sm bg-[#ECEDF8] shadow ">
          <div>
            <Image
              height={30}
              width={30}
              alt="hardvard uni"
              src={'/assets/profile/hardvarduni.svg'}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <Typography
              variant={'h5'}
              weight={'semibold'}
              className="text-[#393939] ml-3 italic"
            >
              {currentlyWorking?.companyName}
            </Typography>
            <ArrowUpRight color="black" className=" cursor-pointer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

CurrentlyWorking.displayName = 'CurrentlyWorking';
