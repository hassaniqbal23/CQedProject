import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import React from 'react';
import { Image } from '../../Image';

export const UniversityLink = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Currently Working with...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4 px-4 text-primary-500 text-center rounded-xl text-sm bg-[#ECEDF8] shadow ">
          <Image
            height={30}
            width={30}
            alt="hardvard uni"
            src={'/assets/profile/hardvarduni.svg'}
          />
          <p className="ml-3 italic font-medium text-[#393939] text-base">
            Harvard University
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

UniversityLink.displayName = 'UniversityLink';
