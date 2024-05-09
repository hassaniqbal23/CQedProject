import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import Link from 'next/link';
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
        <p className="[word-spacing:11px] font-medium italic leading-7 text-sm text-justify whitespace-pre-line ">
          {bio}
          <Link className="text-blue-800 ml-2" href={'#/'}>
            see more
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

ProfileBio.displayName = 'ProfileBio';
