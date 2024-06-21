'use client';
import React from 'react';
import { TabsComponent } from '@/components/ui';
import { UniversitySettingPage } from '@/components/Universitysetting/UniversitySettingsPages/UniSettingPage';
import { UniversityIntegrationPage } from '@/components/Universitysetting/UniversityIntegrationPage/UniIntegrationPage';
import SecuritySettings from '@/components/common/SecuritySettings';

const tabsComponent = [
  {
    value: 'Edit Profile',
    content: <UniversitySettingPage></UniversitySettingPage>,
  },
  {
    value: 'Integration',
    content: <UniversityIntegrationPage></UniversityIntegrationPage>,
  },
  { value: 'security', content: <SecuritySettings></SecuritySettings> },
];

const UniversitySettings = () => {
  return (
    <div>
      <TabsComponent
        defaultValue="Edit Profile"
        tabs={[
          {
            label: 'Edit Profile',
            value: 'Edit Profile',
          },
          {
            label: 'Integration',
            value: 'Integration',
          },
          {
            label: 'Security',
            value: 'security',
          },
        ]}
        tabContent={tabsComponent}
        variant={'secondary'}
      />
    </div>
  );
};

export default UniversitySettings;
