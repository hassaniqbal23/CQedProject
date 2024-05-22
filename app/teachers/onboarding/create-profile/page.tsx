'use client';
import React from 'react';
import { CreateProfile as Profile } from '@/components/common/teacherProfile/create-profile';
import TopNavbar from '@/components/common/navbar/TopNavbar';

const CreateProfile = () => {
  return (
    <div>
      <TopNavbar
        className="static top-0 w-full z-50 "
        onLogout={() => {}}
      ></TopNavbar>
      <Profile></Profile>
    </div>
  );
};

export default CreateProfile;
