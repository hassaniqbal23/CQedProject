'use client';
import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import ImageChip from '@/components/ui/ChipSelect/ImageChip';

interface SkillsProps {
  languages: string[];
  title: string;
}

export const Languages: FC<SkillsProps> = ({ languages, title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className=" flex items-center">{title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-7 ">
          {languages?.map((interest, index) => (
            <div key={index}>
              <ImageChip
                interest={interest}
                hasImage={true}
                imgSrc={'/Globe.svg'}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
