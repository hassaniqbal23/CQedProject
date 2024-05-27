import React from 'react';
import { Avatar, AvatarImage } from '../ui';
import { Typography } from '../common/Typography/Typography';

type CommentProps = {
  user: string;
  text: string;
  avatarUrl: string;
};

export const Comment: React.FC<CommentProps> = ({ user, text, avatarUrl }) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start">
        <Avatar className="w-14 h-14 ">
          <AvatarImage src={avatarUrl} alt={`Profile Picture-${user}`} />
        </Avatar>
        <div className="ml-4 w-full">
          <div className="flex items-center justify-between">
            <Typography variant="h6" weight="medium">
              {user}
              <div className="text-sm font-normal text-[#99A0AE] pb-3 ">
                9h ago
              </div>
            </Typography>
          </div>
          <Typography variant="p" weight="regular">
            {text}
          </Typography>
        </div>
      </div>
    </div>
  );
};
