import React, { FC } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { Button, ButtonProps } from '@/components/ui';
import { MessageCircle } from 'lucide-react';
interface IProps {
  userImage: string;
  heading: string;
}

const StudentProfileNavbar: FC<IProps> = ({ userImage, heading }: IProps) => {
  return (
    <div className="w-full h-[90px] flex justify-between bg-[#4146B8] rounded-sm">
      <div className="flex flex-start mx-4 gap-3 items-center mt-4">
        <Avatar className="w-14 h-14 md:w-54 md:h-54 rounded-full bg-lightgray mb-3">
          <AvatarImage src={userImage} alt="Profile Picture" />
        </Avatar>
        <div className="text-white font-montserrat font-semibold text-2xl mb-3.5">
          {heading}
        </div>
      </div>
      <div className="">
        <Button className=" h-[20px] px-[20px] py-[20px] mt-6 justify-center items-center  rounded-md bg-white  text-[#4146B8] mr-4">
          <MessageCircle className="gap-2" />
          message
        </Button>
      </div>
    </div>
  );
};

export default StudentProfileNavbar;
