"use client";

import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/";
import { BsFillBellFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

interface ILinks {
  src: any;
  alt: string;
  submodules?: {
    [key: string]: string;
  };
}

interface IProps {}

export const Navbar: FC<IProps> = ({}) => {
  const navPopLinks: ILinks[] = [
    {
      src: "/notification",
      alt: "notification",
    },
    {
      src: "",
      alt: "Profile",
      submodules: {
        userName: "admin",
        email: "admin@gmail.com",
      },
    },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className=" pr-[44px]">
        <div className="flex items-center justify-end">
          <div className="flex justify-around sm:justify-between gap-3 items-center py-3">
            {navPopLinks?.map((items: ILinks, index: number) => {
              const submodules = items.submodules;
              return (
                <div key={index}>
                  {items.alt === "notification" ? (
                    <div className="my-2 cursor-pointer">
                      <div className="flex gap-4 items-center p-2 bg-[#F0F0F0] rounded-full">
                        <BsFillBellFill className="text-2xl text-black " />
                      </div>
                    </div>
                  ) : (
                    <Popover key={index}>
                      <PopoverTrigger>
                        {items.alt === "Profile" ? (
                          <div className="flex gap-2 items-center justify-center">
                            <Avatar className="h-10 w-h-10">
                              <AvatarImage
                                src={
                                  items.src || "https://github.com/shadcn.png"
                                }
                              />
                              <AvatarFallback>CQED</AvatarFallback>
                            </Avatar>
                            <div>
                              <h1 className="font-semibold">Moin</h1>
                              <p>Admin</p>
                            </div>
                          </div>
                        ) : (
                          <items.src className="text-base sm:text-sm cursor-pointer text-[#B0BABF] dark:text-foreground" />
                        )}
                      </PopoverTrigger>
                      <PopoverContent className="mt-1 w-[13.1rem] relative right-10 p-0">
                        {items.alt && submodules && (
                          <div className="my-2">
                            <div className="flex gap-4 items-center">
                              <BsFillBellFill className="text-4xl text-[#B0BABF] dark:text-foreground" />
                              <span>
                                <p className="text-gray-500 text-sm">{1}</p>
                              </span>
                            </div>
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
