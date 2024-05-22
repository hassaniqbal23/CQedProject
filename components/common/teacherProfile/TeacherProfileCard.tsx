import React from 'react';
import Image from 'next/image';
interface TeacherProfileCardProps {
  profileImg: string;
  name: string;
  about: string;
  buttonText: string;
  buttonOnClick: () => void;
}

const TeacherProfileCard: React.FC<TeacherProfileCardProps> = ({
  profileImg,
  name,
  about,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <>
      <div className="bg-[#F7F7F7]  max-w-sm p-2 rounded-md">
        <div className="flex justify-center items-center w-full ">
          <Image src={profileImg} alt="" className="w-full rounded-md" />
        </div>
        <div>
          <h2 className="mt-2 text-base font-bold text-[#12121B]">{name}</h2>
          <p className="mt-2 text-[13px font-medium text-[#282931]">{about}</p>
          <button
            className="w-full mt-2 bg-primary-50 text-primary-500 py-2 rounded-full text-[13px] font-semibold"
            onClick={buttonOnClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export { TeacherProfileCard };
