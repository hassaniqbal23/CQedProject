'use client';

import TopNavbar from '@/components/common/navbar/TopNavbar';
import React from 'react';
import AboutStudentsForm from '@/components/common/AboutStudentsForm';

function AboutUserInfo() {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <AboutStudentsForm />
    </div>
  );
}

export default AboutUserInfo;
