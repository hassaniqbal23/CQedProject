import TeacherAccountSettingsPage from '@/components/PageContainers/Profile/TeacherAccountSettingsPage/TeacherAccountSettingsPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Settings - Teachers - GCED',
  description: 'Account Settings - Teachers - GCED',
};

export default function AccountSettingsStudents() {
  return (
    <div>
      <TeacherAccountSettingsPage></TeacherAccountSettingsPage>
    </div>
  );
}
