'use client';
import TopNavbar from '@/components/common/navbar/TopNavbar';
import React from 'react';
import { AboutYou as AboutYouFrom } from '@/components/common/teacherProfile/about-you';

const AboutYou = () => {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <AboutYouFrom />
    </div>
  );
};

export default AboutYou;
