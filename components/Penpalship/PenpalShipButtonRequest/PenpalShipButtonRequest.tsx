import React, { useMemo } from 'react';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import { Button, Dropdown } from '@/components/ui';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
import { useRouter } from 'next/navigation';

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
  const { userInformation, myPenpals } = useGlobalState();
  const { module } = useModule();
  const router = useRouter();

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

  const handleDeleteRequest = () => {
    deleteRequest({
      user_id: penpalId ? Number(penpalId) : penpalInstance?.id,
      searchParams,
    });
  };

  const handleSendRequest = () => {
    sendRequest({ receiverId: user_id, searchParams });
  };

  const renderButtonContent = () => {
    if (penpalInstance?.status === 'PENDING' || penpalStatus === 'PENDING') {
      return 'Pending';
    }
    if (isFriend) {
      return 'Friends';
    }
    return 'Loading';
  };

  const renderDropdownOptions = () => (
    <div
      className="font-semibold text-red-500 bg-red-50 mx-auto"
      onClick={handleDeleteRequest}
    >
      {penpalInstance?.status === 'PENDING' || penpalStatus === 'PENDING'
        ? 'Cancel request'
        : 'Unfriend'}
    </div>
  );

  return (
    <>
      {penpalInstance?.status === 'PENDING' ||
      isFriend ||
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
