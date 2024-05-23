import React, { FC, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dropdown,
} from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/Typography/Typography';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
interface IProps {
  userImage: string;
  userFullName: string;
  description: string;
  iconMenu: string;
  Profile: string;
  Settings: string;
  onDeleteSubject?: (id: string) => void;
  onEditSubjectName?: (id: string, name: string) => void;
}

export const ChatHeader: FC<IProps> = ({
  userImage,
  userFullName,
  description,
  iconMenu,
  Profile,
  Settings,
  onDeleteSubject,
  onEditSubjectName,
}: IProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between bg-[#F4F4F4] items-center px-10 mx-0 py-2 w-full">
      <div className="flex gap-3 justify-center items-center">
        <div>
          <Avatar className="w-14 h-14 rounded-full bg-lightgray">
            <AvatarImage src={userImage} alt="Profile Picture" />
          </Avatar>
        </div>

        <div>
          <Typography
            variant="body"
            weight="medium"
            className="text-[#1E1F21] text-lg font-semibold"
          >
            {userFullName}
          </Typography>
          <Typography
            variant="body"
            weight="medium"
            className=" text-sm text-[#70C670]"
          >
            {description}
          </Typography>
        </div>
      </div>

      <div className="relative">
        <Dropdown
          trigger={
            <div>
              <EllipsisVertical className="cursor-pointer" />
            </div>
          }
          options={[
            {
              content: (
                <div
                  onClick={() =>
                    onDeleteSubject && onDeleteSubject('subject-id')
                  }
                >
                  Remove Subject
                </div>
              ),
            },
            {
              content: (
                <div
                  onClick={() =>
                    onEditSubjectName &&
                    onEditSubjectName('subject-id', 'subject-name')
                  }
                >
                  Edit Subject
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
