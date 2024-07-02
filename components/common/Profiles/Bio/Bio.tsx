import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import React from 'react';
import { Typography } from '../../Typography/Typography';

interface BioProps {
  bio: string;
  title: string;
}

export const ProfileBio: React.FC<BioProps> = ({ bio, title }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-0">
        <Typography
          weight="medium"
          variant="p"
          className=" italic leading-6 text-[#393939] text-justify whitespace-pre-line "
        >
          {bio}
        </Typography>
      </CardContent>
    </Card>
  );
};

ProfileBio.displayName = 'ProfileBio';
