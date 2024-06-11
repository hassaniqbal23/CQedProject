'use client';
import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import ImageChip from '@/components/ui/ChipSelect/ImageChip';

interface Interest {
  title: string;
  img: string;
}

interface SkillsProps {
  interests: Interest[];
  title: string;
}

export const ProfileInterests: FC<SkillsProps> = ({ interests, title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className=" flex items-center">
            {title}
            <span className="italic text-sm text-gray-500 font-medium ml-2">
              (your matching interests are highlighted)
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-7 ">
          {interests.map((interest, index) => (
            <div key={index}>
              <ImageChip
                interest={interest.title}
                hasImage={true}
                imgSrc={interest.img}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
