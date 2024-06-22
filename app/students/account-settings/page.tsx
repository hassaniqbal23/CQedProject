'use client';

import React from 'react';
import ProfileSettings from '@/components/common/ProfileSettings';
import SecuritySettings from '@/components/common/SecuritySettings';
import { TabsComponent } from '@/components/ui';

const tabContents = [
  { value: 'profile', content: <ProfileSettings></ProfileSettings> },
  { value: 'security', content: <SecuritySettings></SecuritySettings> },
];

const AccountSettings = () => {
  return <div>comming soon</div>;
};

export default AccountSettings;
