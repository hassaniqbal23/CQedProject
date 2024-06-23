'use client';

import React, { useState } from 'react';
import TeacherProfileView from '../common/Profiles/TeacherProfileView/TeacherProfileView';
import StudentDetailsPage from '@/components/StudentDetailsPage/StudentDetailsPage';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { getProfile } from '@/app/api/students';
import { useParams } from 'next/navigation';
import Loading from '../ui/button/loading';
import { useQuery } from 'react-query';

const ProfilesView = () => {
  const params = useParams();
  const currentProfileId = Number(params?.id);
  const { userInformation, myPenpals } = useGlobalState();

  const [isFriend, setIsFriend] = useState<boolean>(false);

  const getPenpalInfo = (id: number | string) => {
    const penpal = myPenpals.find((penpal) => penpal.friend.id === id);
    return { isPenpal: !!penpal, penpal };
  };

  const { data, isLoading, error } = useQuery(
    ['getProfile', currentProfileId],
    () => getProfile(currentProfileId as number),
    {
      enabled: currentProfileId ? true : false,
      onSuccess: (data) => {
        let { isPenpal } = getPenpalInfo(currentProfileId);
        setIsFriend(userInformation?.id !== currentProfileId && isPenpal);
      },
    }
  );

  const role = data?.data?.data?.role?.name;

  if (error) {
    return <div>Error loading profile</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {role === 'student' ? (
        <StudentDetailsPage
          isFriend={isFriend}
          data={data}
          setIsFriend={setIsFriend}
        />
      ) : role === 'teacher' ? (
        <TeacherProfileView data={data?.data?.data} />
      ) : null}
    </div>
  );
};

export default ProfilesView;
