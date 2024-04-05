import { FC } from 'react';
import SidebarItem from './SidebarItem';

interface IPropsSidebarMenu {
  sidebarLinks: any;
  pathname: any;
  toggleMenu: any;
  openMenu: any;
}

const SidebarMenu: FC<IPropsSidebarMenu> = ({
  sidebarLinks,
  pathname,
  toggleMenu,
  openMenu,
}) => {
  return (
    <div>
      {sidebarLinks.map(
        (item: { path: string; submodules: any }, index: number) => {
          const isActive =
            pathname === item.path ||
            (item.submodules &&
              item.submodules.some(
                (submodule: { path: string }) => submodule.path === pathname,
              ));
          return (
            <SidebarItem
              key={`item-${index}-${item.path}`}
              item={item}
              isActive={isActive}
              toggleMenu={toggleMenu}
              openMenu={openMenu}
              pathname={pathname}
            />
          );
        },
      )}
    </div>
  );
};

export default SidebarMenu;
