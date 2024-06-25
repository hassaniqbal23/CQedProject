import React, { FC } from 'react';
import { CircleIcon } from './Circle/Circle';
import { UserProfileMatch } from './UserProfileMatch/UserProfileMatch';

interface IProps {
  showNotification: boolean;
}

export const AiMatches: FC<IProps> = ({ showNotification }) => {
  return (
    <div>
      {showNotification ? (
        <UserProfileMatch
          user={{
            id: '123',
            attachment: { file_path: '/John.jpeg' },
            full_name: 'John Doe',
            country: 'United States',
            age: 12,
            state: 'California',
          }}
        />
      ) : (
        <CircleIcon userImage={'/assets/profile/profile.svg'} />
      )}
    </div>
  );
};
