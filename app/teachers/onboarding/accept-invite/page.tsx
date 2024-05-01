'use client';
import { AcceptInvitation } from '@/components/common/AcceptInvitation/AcceptInvitation';
import React from 'react';

export default function TeacherAcceptInvite({
  params: { id },
}: {
  params: { id: string };
}) {
  return <AcceptInvitation routeType="teachers" />;
}

TeacherAcceptInvite.showLayout = false;
