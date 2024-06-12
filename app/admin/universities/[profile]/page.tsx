'use client';
import React from 'react';
import { SchoolProfileView } from '@/components/common/Profiles/SchoolProfileView/SchoolProfileView';

const UniversityProfile = ({ params }: { params: { profile: string } }) => {
  return <SchoolProfileView id={Number(params.profile)} />;
};

export default UniversityProfile;
