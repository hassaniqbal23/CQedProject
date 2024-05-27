import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Typography } from '../common/Typography/Typography';
import { Button } from '../ui';

export interface NotificationProps {
  avatar: string;
  message: string;
  name: string;
  time: string;
  seen: boolean;
  boldName?: string;
  onClickJoin?: () => void;
  onClickReject?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  avatar,
  message,
  time,
  name,
  seen,
  boldName,
  onClickJoin,
  onClickReject,
}) => {
  return (
    <div
      className={`w-full px-4 py-3 rounded-lg ${seen ? 'bg-white' : 'bg-primary-50'}`}
    >
      <div className="flex justify-between items-center gap-5 rounded-md">
        <div className="flex items-center gap-5">
          <img
            className="rounded-full object-cover self-start "
            src={avatar}
            alt="Avatar"
            width={48}
            height={48}
          />
          <div>
            <Typography weight="regular" variant="p">
              <span className="font-bold">{boldName} </span>
              {message}
            </Typography>
            <Typography weight="bold" variant="p">
              {name}
            </Typography>
            <Typography weight="regular" variant="p">
              {time}
            </Typography>
            {onClickJoin && onClickReject && (
              <div className="flex gap-4 mt-2 text-xs font-semibold items-center">
                <Button
                  onClick={onClickJoin}
                  size={'md'}
                  className="rounded-full px-20"
                >
                  Join
                </Button>
                <Button
                  onClick={onClickReject}
                  size={'md'}
                  className="rounded-full px-20 bg-transparent text-primary-500 border border-primary-500"
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="self-start">
          <MoreHorizontal width={24} height={24} />
        </div>
      </div>
    </div>
  );
};
