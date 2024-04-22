import { FC } from 'react';
import SidebarItem from './sidebarItem';
import { ISidebar } from './types';

interface IPropsSidebarMenu {
    sidebarLinks: ISidebar[];
    pathname:string
    isVerticalIcon: boolean
}

const SidebarMenu: FC<IPropsSidebarMenu> = ({
    sidebarLinks,
    pathname,
    isVerticalIcon
}) => {
    return (
        <div >
            {sidebarLinks?.map(
                (item: ISidebar, index: number) => {
                    return (
                        <SidebarItem
                            key={`item-${index}-${item.path}`}
                            item={item}
                            pathname={pathname}
                            isVerticalIcon={isVerticalIcon}
                        />
                    );
                },
            )}
        </div>
    );
};

export default SidebarMenu;
