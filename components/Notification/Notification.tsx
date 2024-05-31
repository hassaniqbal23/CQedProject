import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Typography } from '../common/Typography/Typography';
import { Button, Dropdown } from '../ui';

export interface NotificationV2Props {
  avatar: string;
  message: React.ReactNode;
  actions?: (notification: any) => React.ReactNode;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
}

export const Notification: React.FC<NotificationV2Props> = ({
  avatar,
  message,
  actions,
  onMarkAsRead,
  onDelete,
}) => {
  return (
    <div className={`w-full px-4 py-3 rounded-lg`}>
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
            {message}
            {actions && (
              <div className="flex gap-4 mt-2 text-xs font-semibold items-center">
                {actions({})}
              </div>
            )}
          </div>
        </div>
        <div className="self-start">
          <Dropdown
            options={[
              {
                content: 'Mark as Read',
                command() {
                  if (onMarkAsRead) {
                    onMarkAsRead();
                  }
                },
              },
              {
                content: 'Delete ',
                command() {
                  if (onDelete) {
                    onDelete();
                  }
                },
              },
            ]}
            trigger={
              <Button variant={'outline'} className="border-none">
                <MoreHorizontal width={24} height={24} />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
