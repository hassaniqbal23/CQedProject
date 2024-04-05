import React, { FC } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface SortingArrowsProps {
  requestSortAsc: (key: string) => void;
  requestSortDesc: (key: string) => void;
  ascTitle: string;
  descTitle: string;
  title: string;
}

const SortingArrows: FC<SortingArrowsProps> = ({
  requestSortAsc,
  requestSortDesc,
  ascTitle,
  descTitle,
  title,
}) => {
  return (
    <div className="whitespace-nowrap flex justify-between items-center">
      {title}
      <div className="pl-4">
        <MdKeyboardArrowUp
          className="hover:cursor-pointer mb-[-10px] w-5 h-5"
          onClick={() => requestSortAsc(`${descTitle}`)}
        />
        <MdKeyboardArrowDown
          className="hover:cursor-pointer mt-[-10px] w-5 h-5"
          onClick={() => requestSortDesc(`${ascTitle}`)}
        />
      </div>
    </div>
  );
};

export default SortingArrows;
