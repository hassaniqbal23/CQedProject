import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import React from 'react';

interface BioProps {
  bio: string;
  title: string;
}

export const ProfileBio: React.FC<BioProps> = ({ bio, title }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="[word-spacing:11px] font-medium italic leading-6 text-sm text-justify whitespace-pre-line ">
          {bio}
        </p>
      </CardContent>
    </Card>
  );
};

ProfileBio.displayName = 'ProfileBio';
