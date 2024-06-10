import { hr } from 'date-fns/locale';
import Image from 'next/image';
import React from 'react';

interface GroupHorizontalProps {
  title: string;
  image: string;
  label: string;
  description: string;
  buttonOnClick: () => void;
}

const GroupHorizontal: React.FC<GroupHorizontalProps> = ({
  title,
  image,
  label,
  description,
  buttonOnClick,
}) => {
  return (
    <>
      <hr />
      <div className=" max-w-full flex justify-between items-center px-4 py-2">
        <div className="flex justify-between  w-full md:items-center sm:items-start   ">
          <div className="md:flex gap-4 md:flex-row sm:flex-col sm:items-start md:gap-3">
            <div>
              <Image
                src={image}
                alt=""
                width={67}
                height={67}
                unoptimized={true}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-black">{title}</h2>
              <h3 className="text-[12px] font-semibold text-[#08090A]">
                {label}
              </h3>
              <p className="text-sm font-medium text-[#131517] opacity-[0.60]">
                {description}
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={buttonOnClick}
              className="px-8 py-[10px] bg-primary-50 text-primary font-semibold rounded-3xl"
            >
              Join
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default GroupHorizontal;
