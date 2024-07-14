import React from 'react';

import type { Metadata } from 'next';
import { AdminUniversitiesPage } from '@/components/PageContainers/Admin/Universities/UniversitiesPage';

export const metadata: Metadata = {
  title: 'Universities - GCED',
  description: 'Universities - GCED',
};

const CQCommunities = () => {
  return (
    <div>
      <AdminUniversitiesPage></AdminUniversitiesPage>
    </div>
  );
};

export default CQCommunities;
