import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
interface ITab {
  heading: string;
  path: string;
  access: boolean;
}

interface IProps {
  customTabs: ITab[];
}
interface ITabs {
  heading: string;
  path: string;
}

export const Tabs: FC<IProps> = ({ customTabs }) => {
  const pathname = usePathname();
  const route = useRouter();

  const handleRouteChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    routeLink: string,
  ) => {
    e.preventDefault();
    route.push(routeLink);
  };

  return (
    <div className="sm:flex items-center pl-4 mt-6 w-full h-200px sm:h-[59px]  bg-slate-50 dark:bg-[#131730] rounded-md">
      {customTabs?.map((item: ITabs, index: number) => {
        return (
          <Button
            key={index}
            variant={'link'}
            onClick={(e) => handleRouteChange(e, item.path)}
            className={`block sm:inline hover:no-underline md:py-[10px] md:px-[28px] mx-1 rounded-md font-normal  whitespace-nowrap ${
              pathname === item.path
                ? 'text-indigo-700 bg-indigo-500 bg-opacity-5 rounded '
                : 'text-gray-500 dark:text-foreground hover:dark:bg- hover:text-indigo-700 hover:bg-indigo-500 hover:bg-opacity-5 rounded '
            }`}
          >
            {item.heading}
          </Button>
        );
      })}
    </div>
  );
};

export default Tabs;
