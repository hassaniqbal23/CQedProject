import Link from 'next/link';
import { FC } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useRouter } from 'next/navigation';

interface IProps {
  item: any;
  isActive: boolean;
  toggleMenu: any;
  openMenu: boolean;
  pathname: string;
}

const SidebarItem: FC<IProps> = ({
  item,
  isActive,
  toggleMenu,
  openMenu,
  pathname,
}) => {
  const activeClass = 'text-white bg-[#3F1C9F]';
  const inactiveClass = 'text-primary';
  const router = useRouter();
  const isSubmenuActive = (submenuPath: string) => pathname === submenuPath;

  console.log(item)

  return (
    <div>
      {item.permissions ? (
        <div
          className={`mb-3 group hover:bg-[#3F1C9F] rounded-md ${
            openMenu === item.title ? 'bg-[#6a5c90]' : ''
          } ${item.path ? 'cursor-pointer' : ''} ${
            isActive ? activeClass : inactiveClass
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (item.submodules) {
              toggleMenu(item.title);
            } else {
              router.push(item.path);
            }
          }}
        >
          <div className="flex items-center justify-start py-2 px-3 cursor-pointer ">
            <item.Icon
              className={`text-2xl text-white group-hover:text-gray-100 ${
                isActive ? 'text-white' : 'text-foreground'
              }`}
            />
            <p
              className={`ml-4 text-white text-sm group-hover:text-gray-100 ${
                isActive ? 'text-white' : 'text-foreground'
              }`}
            >
              {item.title}
            </p>
            {item.submodules && (
              <IoIosArrowDown
                className={`transform  ${
                  openMenu === item.title ? 'rotate-180' : ''
                } ml-auto text-[20px]`}
              />
            )}
          </div>
        </div>
      ) : null}
      {item.submodules && openMenu === item.title && (
        <ul className="my-[6px] ml-[19px] pl-[7px] border-l-2 w-[11rem]">
          {item.submodules.map(
            (
              submenuItem: {
                path: string;
                title: string;
                Icon: React.ElementType;
                permissions: boolean;
              },
              submenuIndex: number,
            ) => {
              if (submenuItem.permissions) {
                return (
                  <li key={submenuIndex}>
                    <Link
                      href={submenuItem.path}
                      className={`pl-[6px] mr-[6px] mb-[6px] flex justify-start items-center hover:bg-primary/[0.1] rounded-md group ${
                        isSubmenuActive(submenuItem.path) ? activeClass : ''
                      }`}
                    >
                      <submenuItem.Icon
                        className={`text-base group-hover:text-primary ${
                          isSubmenuActive(submenuItem.path)
                            ? 'text-primary'
                            : 'text-foreground'
                        }`}
                      />
                      <div className="flex items-center pl-[6px] py-[6px]">
                        <p
                          className={`ml-3 text-sm group-hover:text-primary ${
                            isSubmenuActive(submenuItem.path)
                              ? 'text-primary'
                              : 'text-foreground'
                          }`}
                        >
                          {submenuItem.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              }
              return null;
            },
          )}
        </ul>
      )}
    </div>
  );
};

export default SidebarItem;
