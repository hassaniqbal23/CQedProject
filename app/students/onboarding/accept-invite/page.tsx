'use client';
import { AcceptInvitation } from '@/components/common/AcceptInvitation/AcceptInvitation';
import React from 'react';

export default function StudentAcceptInvite({
  params: { id },
}: {
  params: { id: string };
}) {
  return <AcceptInvitation routeType="students" />;
}

StudentAcceptInvite.showLayout = false;
