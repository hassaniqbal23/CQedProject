import React, { FC } from 'react';
import { CircleIcon } from './Circle/Circle';
import locationIcon from '@/public/countries/uk.svg';
import { ProfileNotification } from './ProfileNotifaction/ProfileNotifaction';

interface IProps {
  showNotification: boolean;
}

export const AiMatches: FC<IProps> = ({ showNotification }) => {
  return (
    <div>
      {showNotification ? (
        <ProfileNotification
          userImage={'/avatar2.svg'}
          heading={'We have a match for you'}
          countryFlag={locationIcon}
          notification={'Hello'}
          username={'john -2'}
          country={'united states'}
          matches={'5/7 interests matched'}
        />
      ) : (
        <CircleIcon userImage={'/assets/profile/profile.svg'} />
      )}
    </div>
  );
};
