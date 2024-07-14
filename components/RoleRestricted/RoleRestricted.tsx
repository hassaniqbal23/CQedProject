import { useGlobalState } from '@/app/globalContext/globalContext';
import React, { ReactNode } from 'react';

export type RoleRestrictedRole = 'student' | 'teacher' | 'school' | '*';

interface RoleRestrictedProps {
  children: ReactNode;
  role: RoleRestrictedRole;
}

export const RoleRestricted = (props: RoleRestrictedProps) => {
  const { userInformation } = useGlobalState();

  React.useEffect(() => {
    console.log('RoleRestricted', userInformation);
  }, [userInformation]);

  return <>{props.children}</>;
};
