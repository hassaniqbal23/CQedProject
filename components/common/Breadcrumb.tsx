import { ReactNode, Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type TBreadcrumbItem = {
  label: string;
  url: string;
  active?: boolean;
};

type TBreadcrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  customItems?: TBreadcrumbItem[];
  deactiveClasses?: string;
};

const Breadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
  customItems,
  deactiveClasses,
}: TBreadcrumbProps) => {
  const paths = usePathname();
  const breadcrumbItems = customItems || [];

  return (
    <div>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={'/'}>{homeElement}</Link>
        </li>
        {breadcrumbItems.length > 0 && separator}
        {breadcrumbItems.map((item, index) => {
          let href = item.url;
          let isActive = item.active || paths === href;
          let isLastItem = index === breadcrumbItems.length - 1;
          let itemClasses = isActive
            ? `${listClasses} ${activeClasses}`
            : isLastItem
            ? `${listClasses} ${deactiveClasses}`
            : listClasses;
          let itemLabel = capitalizeLinks
            ? item.label[0]?.toUpperCase() + item.label.slice(1)
            : item.label;

          return (
            <Fragment key={index}>
              <li className={itemClasses}>
                {isLastItem ? (
                  <span>{itemLabel}</span>
                ) : (
                  <Link href={href}>{itemLabel}</Link>
                )}
              </li>
              {breadcrumbItems.length !== index + 1 && separator}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
