import React, { FC } from 'react';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import { CircleAlert, PhoneOff, Trash2 } from 'lucide-react';

interface IProps {
  userImage: string;
  userFullName: string;
}

export const ChatSideBar: FC<IProps> = ({ userImage, userFullName }) => {
  const ChatSidebarActions = [
    {
      icon: <CircleAlert size={18} />,
      label: 'Report',
      command: function () {},
    },
    { icon: <PhoneOff size={18} />, label: 'Block', command: function () {} },
    {
      icon: <Trash2 size={18} color="red" />,
      label: 'Delete',
      command: function () {},
    },
  ];
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex flex-col items-center">
        <Avatar className="w-[150px] h-[150px] rounded-full bg-lightgray">
          <AvatarImage src={userImage} alt="Profile Picture" />
        </Avatar>
        <Typography
          variant="p"
          weight="medium"
          className="text-[#131517] text-[20px] font-semibold text-center mt-4"
        >
          {userFullName}
        </Typography>
        <Button className="rounded-full bg-[#2183C4] text-[#F5FBFF] text-sm w-32 h-10 mt-3">
          View Profile
        </Button>
      </div>
      <div>
        <Typography
          variant="p"
          weight="medium"
          className="text-[#414141] text-[16px] font-semibold mt-3 mb-1"
        >
          Media
        </Typography>
        <div className="py-1">
          <img
            src="/assets/girlmedia.png"
            alt="media"
            className="object-cover w-full"
          />
        </div>
        <div className="py-1 grid grid-cols-2 gap-2">
          <img
            src="/assets/girlmedia2.png"
            alt="media"
            className="object-cover w-full"
          />
          <img
            src="/assets/girlmedia2.png"
            className="object-cover w-full"
            alt="media"
          />
        </div>
      </div>
      <div className="border-[0.9px] my-2" />
      <div className="w-full">
        {ChatSidebarActions.map(({ icon, label, command }, index) => (
          <button
            className="flex items-center w-full py-3"
            key={index}
            onClick={() => {
              command();
            }}
          >
            <span className="text-sm">{icon}</span>
            <Typography
              variant="p"
              weight="medium"
              className="text-[#393939] text-[14px] font-medium ml-2"
            >
              {label}
            </Typography>
          </button>
        ))}
      </div>
      <div className="border-[0.9px] my-2" />
    </div>
  );
};
