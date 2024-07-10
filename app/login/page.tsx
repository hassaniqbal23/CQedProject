import React from 'react';

import type { Metadata } from 'next';
import SuperAdminLogin from '@/components/SuperAdminLogin/SuperAdminLogin';

export const metadata: Metadata = {
  title: 'Admin Login - GCED',
  description: 'Admin Login - GCED',
};

const CQCommunities = () => {
  return (
    <div>
      <SuperAdminLogin />
    </div>
  );
};

export default CQCommunities;
