import { FC, useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { BsFillBellFill, BsThreeDotsVertical, BsList } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Bell, MessageCircle } from "lucide-react";
// import NotificationComponent from "@/components/dashboardlayout/NotificationComponent";

interface ILinks {
  src: FC<any> | null;
  alt: string;
  submodules?: {
    [key: string]: string;
  };
}

interface IProps {}

export const Navbar: FC<IProps> = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navPopLinks: ILinks[] = [
    {
      src: null, // Use the imported notification component here
      alt: "notification",
    },
    {
      src: null, // Placeholder for empty src
      alt: "Profile",
      submodules: {
        userName: "admin",
        email: "admin@gmail.com",
      },
    },
  ];
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-20">
      <div className="pr-[44px]">
        <div className="flex items-center justify-between mt-2 ">
          <div className="flex gap-3 items-center py-3">
            {windowWidth <= 768 && (
              <div
                className="cursor-pointer ml-1"
                onClick={() => setShowMenu(!showMenu)}
              >
                <BsList className=" text-black border text-3xl " />
              </div>
            )}

            {windowWidth <= 768 && (
              <div className="flex justify-around sm:justify-between gap-3 items-center">
                {navPopLinks.map((item: ILinks, index: number) => (
                  <div key={index}>
                    <Popover>
                      <PopoverTrigger>
                        {item.alt === "Profile" ? (
                          <div className="flex gap-2 items-center justify-center">
                            <span className="notification-text w-11 h-11 md:w-10 md:h-14 p-3 flex justify-center items-center rounded-full bg-gray-300">
                              <MessageCircle className="text-black" />
                            </span>
                            <span className="notification-text  w-11 h-11 md:w-16 md:h-16 p-3 flex justify-center items-center rounded-full bg-gray-300">
                              <Bell className="text-black" />
                            </span>
                            <Avatar className="h-12 w-12 md:h-16 md:w-16">
                              <AvatarImage
                                src={
                                  item.src
                                    ? "https://github.com/shadcn.png"
                                    : ""
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
                          item.src && (
                            <item.src className="text-base sm:text-sm cursor-pointer text-[#B0BABF] dark:text-foreground" />
                          )
                        )}
                      </PopoverTrigger>
                      <PopoverContent className="mt-1 w-[13.1rem] relative right-10 p-0">
                        {item.alt && item.submodules && (
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
                  </div>
                ))}
              </div>
            )}
          </div>

          {windowWidth > 768 && (
            <div className="flex justify-around sm:justify-between gap-3 items-center">
              {navPopLinks.map((item: ILinks, index: number) => (
                <div key={index}>
                  <Popover>
                    <PopoverTrigger>
                      {item.alt === "Profile" ? (
                        <div className="flex gap-2 items-center justify-center mr-2 mt-3">
                          <span className="notification-text w-h-10 h-10  p-[13px] flex justify-center items-center rounded-full bg-gray-300">
                            <MessageCircle className="text-black h-10 w-h-10" />
                          </span>
                          <span className="notification-text w-11 h-11  p-[13px] flex justify-center items-center rounded-full bg-gray-300">
                            <Bell className="text-black h-10 w-h-10" />
                          </span>
                          <Avatar className="h-10 w-h-10">
                            <AvatarImage
                              src={
                                item.src ? "https://github.com/shadcn.png" : ""
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
                        item.src && (
                          <item.src className="text-base sm:text-sm cursor-pointer text-[#B0BABF] dark:text-foreground" />
                        )
                      )}
                    </PopoverTrigger>
                    <PopoverContent className="mt-1 w-[13.1rem] relative right-10 p-0">
                      {item.alt && item.submodules && (
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
