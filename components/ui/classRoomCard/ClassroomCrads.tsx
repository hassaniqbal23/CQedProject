import React from 'react';
import avatar1 from '/public/avatar1.svg';
import avatar2 from '/public/avatar2.svg';
import avatar3 from '/public/avatar3.svg';
import Edit from '/public/edit.svg';
import Image from 'next/image';
import { boolean } from 'zod';

interface CardProps {
  title: string;
  studentCount: number | string;
  buttonText: string;
  buttonOnClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  studentCount,
  buttonOnClick,
  buttonText,
}) => {
  return (
    <div className="bg-[#F7F9FB] rounded-sm  shadow-md mx-w-full flex justify-center items-center flex-col p-4 gap-3 relative ">
      <Image
        src={Edit}
        alt=""
        className="text-right absolute right-4   top-4 cursor-pointer"
        width={18}
        onClick={buttonOnClick}
      />
      <div className="flex justify-between  relative z-1 items-center w-40 m-auto h-14 ">
        <Image
          src={avatar3}
          alt=""
          className=" absolute left-5 z-10"
          width={39}
        ></Image>
        <Image
          src={avatar1}
          alt=""
          className="absolute left-12 "
          width={50}
        ></Image>
        <Image
          src={avatar2}
          alt=""
          className=" absolute  right-7 "
          width={39}
        ></Image>
      </div>

      <h2 className="text-[16px] font-semibold text-primary-500  ">{title}</h2>

      <p className="text-secondary-foreground font-[400] text-[10px]">
        {studentCount}{' '}
      </p>

      <button
        className="bg-primary-50 text-primary-500 font-semibold rounded-3xl py-[10px] px-7 "
        onClick={buttonOnClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
