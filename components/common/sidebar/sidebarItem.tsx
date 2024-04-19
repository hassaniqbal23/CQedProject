import Link from 'next/link';
import { FC } from 'react';
import { Image } from '../Image';
import { ISidebar } from './types';

interface IProps {
    item: ISidebar;
    pathname: string
    isVerticalIcon: boolean
}

const SidebarItem: FC<IProps> = ({
    item,
    pathname,
    isVerticalIcon
}) => {
    return (
        <ul className={`my-[6px] pl-[7px] pr-[7px] py-4 hover:bg-[#3F1C9F] ${pathname === item?.path ? "bg-[#3F1C9F]" : ""} `}>
            {
                isVerticalIcon ? (
                    <li className='flex justify-center'>
                        <Link
                            href={item.path}
                            className={` text-white  mb-[6px] rounded-md group`}
                        >
                            <div className='flex justify-center items-center'>
                               <Image src={item.icon} width={30} height={30} alt={`displayed ${item.title}`} />
                            </div>
                            <div className="py-[6px]">
                                <p
                                    className={`text-sm group-hover:text-white`}
                                >
                                    {item.title}
                                </p>
                            </div>
                        </Link>
                    </li>
                ) : (
                    <li className='flex pl-5'>
                        <Link
                            href={item.path}
                            className={`pl-[6px] text-white mr-[6px] mb-[6px] flex justify-center items-center rounded-md group`}
                        >
                            <Image src={item.icon} width={30} height={30} alt={`displayed ${item.title}`} />
                            <div className="flex items-center pl-[6px] py-[6px]">
                                <p
                                    className={`ml-3 text-sm group-hover:text-white`}
                                >
                                    {item.title}
                                </p>
                            </div>
                        </Link>
                    </li>

                )
            }

        </ul>
    );
};

export default SidebarItem;
