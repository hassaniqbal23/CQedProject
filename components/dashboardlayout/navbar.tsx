import { FC } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { SmallHeading } from '../common/SmallHeading';
import {
  BsFillBellFill
} from 'react-icons/bs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


interface ILinks {
  src: any;
  alt: string;
  submodules?: {
    [key: string]: string;
  };
}

interface IProps {}

export const Navbar: FC<IProps> = ({ }) => {

  const navPopLinks: ILinks[] = [
    {
      src: "",
      alt: 'Profile',
      submodules: {
        userName: 'admin',
        email: 'admin@gmail.com',
      },
    },
  ];

 

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className=" pr-[44px]">
        <div className="flex items-center justify-between">
          <div className="flex justify-around sm:justify-between gap-2 items-center py-2 sm:py-0">
            {navPopLinks?.map((items: ILinks, index: number) => {
              const submodules = items.submodules;
              return (
                <Popover key={index}>
                  <PopoverTrigger>
                    {items.alt === 'Profile' ? (
                      <Avatar className="h-7 w-7">
                        <AvatarImage
                          src={items.src || 'https://github.com/shadcn.png'}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    ) : (
                      <items.src className="text-base sm:text-sm cursor-pointer text-[#B0BABF] dark:text-foreground" />
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="mt-1 w-[13.1rem] relative right-10 p-0">
                    {items.alt === 'Notifications' && submodules && (
                      <div className="my-2">
                        <div className="flex gap-4 items-center">
                          <BsFillBellFill className="text-4xl text-[#B0BABF] dark:text-foreground" />
                          <span>
                            <SmallHeading className="" text="Notifications" />
                            <p className="text-gray-500 text-sm">
                              {1}
                            </p>
                          </span>
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
