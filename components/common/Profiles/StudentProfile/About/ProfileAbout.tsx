'use client';
import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';

interface AboutProps {
  details?: string;
  title: string;
  className?: string;
}

export const ProfileAbout: FC<AboutProps> = ({
  details = '',
  title,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {' '}
        <Typography variant="h6" weight="medium" className="text-sm">
          {details}
        </Typography>
      </CardContent>
    </Card>
  );
};
