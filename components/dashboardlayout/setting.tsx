'use client';

import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import usePermissions from '@/app/hooks/singleAccessPage';

interface IAccountSetting {
  heading: string;
  path: string;
  access: boolean;
}

export const Setting: FC = () => {
  const pathname = usePathname();
  const route = useRouter();
  const permissions = {
    profile: usePermissions('accountsetting', 'read'),
    workspace: usePermissions('workspaces', 'read'),
    security: usePermissions('security', 'read'),
    billing: usePermissions('billing', 'read'),
    notifications: usePermissions('notifications', 'read'),
    connections: usePermissions('connections', 'read'),
  };

  const accountSetting: IAccountSetting[] = [
    {
      heading: 'Profile',
      path: '/dashboard/accountsetting/profile',
      access: permissions.profile,
    },
    {
      heading: 'Workspace',
      path: '/dashboard/accountsetting/workspace',
      access: permissions.workspace,
    },
    {
      heading: 'Security',
      path: '/dashboard/accountsetting/security',
      access: permissions.security,
    },
    {
      heading: 'Billing & plans',
      path: '/dashboard/accountsetting/billing',
      access: permissions.billing,
    },
    {
      heading: 'Notifications',
      path: '/dashboard/accountsetting/notifications',
      access: permissions.notifications,
    },
    {
      heading: 'Connections',
      path: '/dashboard/accountsetting/connections',
      access: permissions.connections,
    },
  ];

  const handleRouteChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    routelink: string,
  ) => {
    e.preventDefault();
    route.push(routelink);
  };

  return (
    <div className="sm:flex items-center pl-4 mt-6 w-full h-200px sm:h-[59px] bg-slate-100 dark:bg-[#131730] rounded-md">
      {accountSetting?.map((item: IAccountSetting, index: number) => {
        if (item.access) {
          return (
            <Button
              key={index}
              variant={'link'}
              onClick={(e) => handleRouteChange(e, item.path)}
              className={`block sm:inline hover:no-underline md:py-[10px] md:px-[28px] mx-1 rounded-md font-normal  whitespace-nowrap ${
                pathname === item.path
                  ? 'text-foreground bg-white dark:bg-primary shadow-md'
                  : 'text-slate-700 dark:text-foreground hover:dark:bg-primary hover:bg-white hover:shadow-md'
              }`}
            >
              {item.heading}
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Setting;
