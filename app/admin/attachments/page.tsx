'use client';
import React from 'react';

import { useGlobalState } from '@/app/globalContext/globalContext';
import AttachmentTable from '@/components/common/AttachmentsTable';

const AttachmentsPage = () => {
  const { userInformation, isUserGetInfo } = useGlobalState();

  if (isUserGetInfo) return <div>Loading Info...</div>;
  return (
    <div className="w-full">
      <AttachmentTable data={[userInformation]} />
    </div>
  );
};

export default AttachmentsPage;
