'use client';

import React from 'react';
import { TabsComponent } from '@/components/ui';
import { ProfileHeader } from '@/components/common/Profiles/Header/Header';
import { TeacherProfileView } from '@/components/common/Profiles/TeacherProfileView/TeacherProfileView';
export default function TeacherProfilePage() {
  const tabContents = [{ value: 'profile', content: <div></div> }];
  return (
    <>
      <TeacherProfileView />
    </>
  );
}
