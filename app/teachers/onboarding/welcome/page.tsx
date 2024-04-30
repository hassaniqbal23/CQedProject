'use client';
import React from 'react';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import { GreatJob as GreatJobComponent } from '@/components/common/teacherProfile/great-job';

const GreatJob = () => {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <GreatJobComponent />
    </div>
  );
};

export default GreatJob;
