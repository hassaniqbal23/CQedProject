'use client';

import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button/button';

interface IAccountSetting {
  heading: string;
  path: string;
}

export const Setting: FC = () => {
  const pathname = usePathname();
  const route = useRouter();

  const accountSetting: IAccountSetting[] = [
    {
      heading: 'Profile',
      path: '/accountsetting/profile',
    },
    {
      heading: 'Security',
      path: '/accountsetting/security',
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
        if (true) {
          return (
            <Button
              key={index}
              // variant={'link'}
              onClick={(e: any) => handleRouteChange(e, item.path)}
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
