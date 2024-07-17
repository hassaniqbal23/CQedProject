'use client';
import React from 'react';

import { AcceptInvitation } from '@/components/common/AcceptInvitation/AcceptInvitation';

export default function OnBoardingStudentAcceptInvite() {
  return <AcceptInvitation routeType="students" />;
}

OnBoardingStudentAcceptInvite.showLayout = false;
