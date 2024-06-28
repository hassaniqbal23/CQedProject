'use client';

import React, { useEffect, useState } from 'react';
import TeacherProfileView from '../common/Profiles/TeacherProfileView/TeacherProfileView';
import StudentDetailsPage from '@/components/StudentDetailsPage/StudentDetailsPage';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { getProfile } from '@/app/api/students';
import { useQuery, useQueryClient } from 'react-query';
import { useParams, useRouter } from 'next/navigation';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import Loading from '../ui/button/loading';
import { ProfileHeader } from '@/components/common/Profiles';

const ProfilesView = () => {
  const params = useParams();
  const currentProfileId = Number(params?.id);
  const queryClient = useQueryClient();
  const { userInformation, myPenpals } = useGlobalState();
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { sendRequest, isCreatingPenpal, deleteRequest, isDeletingPenpal } =
    useSendPenpalRequest();
  const router = useRouter();
  const { module } = useModule();
  const buttonText = isPending
    ? 'Pending'
    : userInformation?.id === currentProfileId
      ? 'Edit Profile'
      : 'Add Friend';

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
        queryClient.refetchQueries('MyPenPals');
      },
    }
  );
  const handleUnfriend = (profileData: any, penpal: any) => {
    const userId = profileData?.penpalId
      ? Number(profileData?.penpalId)
      : penpal.id;
    deleteRequest({
      user_id: userId,
    });
    setIsFriend(false);
    setIsPending(false);
  };
  const profileData = data?.data?.data;
  const handleClick = () => {
    const { penpal } = getPenpalInfo(profileData?.id);
    userInformation?.id === currentProfileId
      ? router.push(`/${module}/account-settings`)
      : isFriend
        ? penpal && handleUnfriend(profileData, penpal)
        : sendRequest({ receiverId: Number(profileData?.id) });
  };

  useEffect(() => {
    let { isPenpal: myPenpal, penpal } = getPenpalInfo(currentProfileId);

    penpal?.status === 'PENDING' || profileData?.penpalStatus === 'PENDING'
      ? setIsPending(true)
      : setIsPending(false);

    let isPenpal =
      data?.data?.data?.penpalStatus === 'ACCEPTED' ||
      penpal?.status === 'ACCEPTED'
        ? true
        : false;
    setIsFriend(
      userInformation?.id !== currentProfileId && isPenpal && myPenpal
        ? true
        : false
    );
  }, [profileData, currentProfileId, myPenpals]);

  const role = profileData?.role?.name;

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
          data={profileData}
          setIsFriend={setIsFriend}
          setIsPending={setIsPending}
          buttonText={buttonText}
          handleClick={handleClick}
          isPending={isPending}
          isCreatingPenpal={isCreatingPenpal}
          isDeletingPenpal={isDeletingPenpal}
          penpalStatus={profileData?.penpalStatus}
        />
      ) : role === 'teacher' ? (
        <TeacherProfileView
          isFriend={isFriend}
          data={profileData}
          buttonText={buttonText}
          handleClick={handleClick}
          isPending={isPending}
          isCreatingPenpal={isCreatingPenpal}
          isDeletingPenpal={isDeletingPenpal}
          penpalStatus={profileData?.penpalStatus}
        />
      ) : null}
    </div>
  );
};

export default ProfilesView;
