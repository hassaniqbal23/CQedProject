'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

interface SkillsProps {
  skills: string[];
  title: string;
}

export const ProfileSkills: React.FC<SkillsProps> = ({ skills, title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-7 ">
          {skills.map((skill: string, index: number) => (
            <div
              key={index}
              className="py-2 px-4 text-primary-500 text-center rounded-full text-sm bg-gray-100 shadow"
            >
              {skill}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

ProfileSkills.displayName = 'ProfileSkills';
