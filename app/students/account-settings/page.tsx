import StudentAccountSettingsPage from '@/components/PageContainers/Profile/StudentAccountSettingsPage/StudentAccountSettingsPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Settings - Students - GCED',
  description: 'Account Settings - Students - GCED',
  icons: '/favi.png',
};

export default function AccountSettingsStudents() {
  return (
    <div>
      <StudentAccountSettingsPage></StudentAccountSettingsPage>
    </div>
  );
}
