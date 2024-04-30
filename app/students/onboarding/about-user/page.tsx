'use client';

import React from 'react'
import TopNavbar from '@/components/common/navbar/TopNavbar'
import AboutStudentsForm from '@/components/common/AboutStudentsForm'

function AboutUserInfo() {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
      <AboutStudentsForm />
    </div>
  );
}

export default AboutUserInfo;
