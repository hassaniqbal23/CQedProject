import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Dropdown } from '../ui';
import Image from 'next/image';

export interface NotificationV2Props {
  avatar: string;
  isRead?: boolean;
  message: React.ReactNode;
  actions?: (notification: any) => React.ReactNode;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export const Notification: React.FC<NotificationV2Props> = ({
  avatar,
  message,
  actions,
  onMarkAsRead,
  onDelete,
  isRead,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-lg ${isRead ? '' : 'bg-primary-50'} cursor-pointer hover:bg-primary-50 mb-2`}
    >
      <div className="flex justify-between items-center gap-5 rounded-md">
        <div className="flex items-center gap-5">
          <Image
            className="rounded-full object-cover self-start h-12 w-12 "
            src={avatar}
            alt="Avatar"
            width={48}
            height={48}
            unoptimized
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
              <div className="border-none cursor-pointer">
                <MoreHorizontal width={24} height={24} />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
