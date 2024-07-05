import React, { useMemo } from 'react';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import { Button, Dropdown } from '@/components/ui';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import { unblockUser } from '@/app/api/users';

export interface PenpalShipButtonRequestProps {
  user_id?: number | null | string;
  penpalStatus?: string;
  searchParams?: any;
  penpalId?: number;
  isFriend?: boolean;
}

const PenpalShipButtonRequest: React.FC<PenpalShipButtonRequestProps> = ({
  user_id,
  penpalStatus = '',
  searchParams,
  penpalId,
  isFriend: isMyFriend,
}) => {
  const { sendRequest, deleteRequest, isCreatingPenpal, isDeletingPenpal } =
    useSendPenpalRequest();
  const { userInformation, myPenpals, usersIBlocked } = useGlobalState();
  const { module } = useModule();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: unBlockProfile } = useMutation(
    (blockedUserId: number) => unblockUser(blockedUserId),
    {
      onSuccess: () => {
        queryClient.refetchQueries('get-users-i-blocked');
        queryClient.refetchQueries('MyPenPals');
      },
      onError: (error) => {
        console.log('Error unblocking user', error);
      },
    }
  );

  const penpalInstance = useMemo(
    () =>
      myPenpals.find(
        (pal) =>
          (pal.receiverId == user_id && pal.senderId == userInformation.id) ||
          (pal.receiverId == userInformation.id && pal.senderId == user_id)
      ),
    [myPenpals, user_id, userInformation.id]
  );

  const isFriend = useMemo(
    () => (isMyFriend !== undefined ? isMyFriend : !!penpalInstance),
    [isMyFriend, penpalInstance]
  );

  const getBlockedUserId = (userId: number | string) => {
    const blockedUser = usersIBlocked.find(
      (blockedUser: any) => blockedUser.blockedUserId === userId
    );
    return blockedUser ? blockedUser.id : null;
  };

  const handleDeleteRequest = () => {
    deleteRequest({
      user_id: penpalId ? Number(penpalId) : penpalInstance?.id,
      searchParams,
    });
  };

  const handleSendRequest = () => {
    sendRequest({ receiverId: user_id, searchParams });
  };

  const blockedUser = getBlockedUserId(Number(user_id));
  const renderButtonContent = () => {
    if (penpalInstance?.status === 'PENDING' || penpalStatus === 'PENDING') {
      return 'Pending';
    }
    if ((isFriend && blockedUser) || blockedUser) {
      return 'Blocked';
    }
    if (isFriend) {
      return 'Friends';
    }
    return 'Loading';
  };

  const renderDropdownOptions = () => (
    <div
      className="font-semibold text-red-500 bg-red-50 mx-auto"
      onClick={
        blockedUser ? () => unBlockProfile(blockedUser) : handleDeleteRequest
      }
    >
      {blockedUser
        ? 'Unblock'
        : penpalInstance?.status === 'PENDING' || penpalStatus === 'PENDING'
          ? 'Cancel request'
          : 'Unfriend'}
    </div>
  );

  return (
    <>
      {penpalInstance?.status === 'PENDING' ||
      isFriend ||
      blockedUser ||
      penpalStatus === 'PENDING' ? (
        <Dropdown
          trigger={
            <Button
              loading={isDeletingPenpal}
              disabled={isDeletingPenpal}
              className="ml-auto px-8 h-10 rounded-full bg-primary-50 text-primary-500"
            >
              {renderButtonContent()}
            </Button>
          }
          options={[{ content: renderDropdownOptions() }]}
        />
      ) : userInformation.id === user_id ? (
        <Button
          loading={isCreatingPenpal}
          onClick={() => router.push(`/${module}/account-settings`)}
          disabled={isCreatingPenpal}
          className={
            'ml-auto px-8 h-10 rounded-full bg-primary-50 text-primary-500'
          }
        >
          Edit Profile
        </Button>
      ) : (
        <Button
          loading={isCreatingPenpal}
          onClick={handleSendRequest}
          disabled={isCreatingPenpal}
          className={
            'ml-auto px-8 h-10 rounded-full bg-primary-50 text-primary-500'
          }
        >
          Connect
        </Button>
      )}
    </>
  );
};

export { PenpalShipButtonRequest };
