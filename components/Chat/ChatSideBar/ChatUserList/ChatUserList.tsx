import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { ExpandableText } from '@/components/common/ExpandableText/ExpandableText';
import { TypographyC } from '@/components/common/Typography/Typography.stories';
import { Typography } from '@/components/common/Typography/Typography';
import { useChatGuard } from '../../ChatProvider/ChatGuard';
import { useChatFeatures } from '../../ChatProvider/ChatProvider';

interface IProps {
  users: any[];
}

export const ChatUserList: FC<IProps> = ({ users }: IProps) => {
  const { joinConversation } = useChatGuard();
  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => {
        return (
          <div className="" onClick={() => joinConversation(user.id)}>
            <div className="flex gap-3 p-4 items-center hover:bg-primary-50 hover:text-primary-500 transition-all cursor-pointer active:bg-primary-50">
              <div>
                <Avatar className="w-14 h-14 md:w-54 md:h-54 rounded-full bg-lightgray ">
                  <AvatarImage
                    src={
                      user.user.attachment?.file_path ||
                      '/assets/profile/profile.svg'
                    }
                    alt="Profile Picture"
                  />
                </Avatar>
              </div>
              <div className="">
                <Typography
                  className="text-lg font-semibold"
                  variant="body"
                  weight="medium"
                >
                  {user.user.name}
                </Typography>

                <ExpandableText
                  className="text-sm font-medium"
                  text={
                    user.messages[user.messages.length - 1]?.message ||
                    'No message'
                  }
                  maxLength={12}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
