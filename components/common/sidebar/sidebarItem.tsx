import Link from 'next/link';
import { FC } from 'react';
import { Image } from '../Image';
import { ISidebar } from './types';

interface IProps {
  item: ISidebar;
  pathname: string;
  isVerticalIcon: boolean;
}

const SidebarItem: FC<IProps> = ({ item, pathname, isVerticalIcon }) => {
  return (
    <>
      {isVerticalIcon ? (
        <li
          className={`flex justify-center hover:bg-[#3F1C9F] cursor-pointer  ${pathname === item?.path ? 'bg-[#3F1C9F]' : ''}`}
        >
          <Link
            href={item.path}
            className={` text-white mb-[6px] rounded-md group my-[6px] pl-[7px] pr-[7px] py-4  `}
          >
            <div className="flex justify-center items-center">
              <Image
                src={item.icon}
                width={30}
                height={30}
                alt={`displayed ${item.title}`}
              />
            </div>
            <div className="py-[6px]">
              <p className={`text-sm group-hover:text-white`}>{item.title}</p>
            </div>
          </Link>
        </li>
      ) : (
        <li
          className={`flex hover:bg-[#3F1C9F] ${pathname === item?.path ? 'bg-[#3F1C9F]' : ''} cursor-pointer`}
        >
          <Link
            href={item.path}
            className={` text-white mb-[6px] pl-12 py-5 flex rounded-md group w-full  `}
          >
            <Image
              src={item.icon}
              width={30}
              height={30}
              alt={`displayed ${item.title}`}
              className="mr-4"
            />
            <div className="flex items-center">
              <p className={`text-sm group-hover:text-white`}>{item.title}</p>
            </div>
          </Link>
        </li>
      )}
    </>
  );
};

export default SidebarItem;
