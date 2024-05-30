import React, { FC, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { ExpandableText } from '@/components/common/ExpandableText/ExpandableText';
import { Typography } from '@/components/common/Typography/Typography';
import { useChatGuard } from '../../ChatProvider/ChatGuard';

interface IProps {
  users: any[];
}

export const ChatUserList: FC<IProps> = ({ users }: IProps) => {
  const { joinConversation } = useChatGuard();
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const handleUserClick = (userId: string) => {
    setActiveUserId(userId);
    joinConversation(userId);
  };

  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => (
        <div key={user.id} onClick={() => handleUserClick(user.id)}>
          <div
            className={`flex gap-3 p-3 items-center transition-all cursor-pointer rounded-l-lg 
              ${activeUserId === user.id ? 'bg-primary-50 text-primary-600' : 'hover:bg-primary-50 hover:text-primary-500 active:bg-primary-50'}
            `}
          >
            <div>
              <Avatar className="w-14 h-14 md:w-[48px] md:h-[48px] rounded-full bg-lightgray">
                <AvatarImage
                  src={user.user.attachment?.file_path || '/assets/profile/profile.svg'}
                  alt="Profile Picture"
                />
              </Avatar>
            </div>
            <div>
              <Typography className="text-lg font-semibold" variant="body" weight="medium">
                {user.user.name}
              </Typography>
              <ExpandableText className="text-sm font-medium" text={user.lastMessageReceived} maxLength={12} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
