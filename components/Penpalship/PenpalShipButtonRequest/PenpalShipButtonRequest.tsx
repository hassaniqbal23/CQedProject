import { useGlobalState } from '@/app/globalContext/globalContext';
import { Button } from '@/components/ui';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
import React from 'react';

export interface PenpalShipButtonRequestProps {
  user_id: number | string | undefined;
}

const PenpalShipButtonRequest: React.FC<PenpalShipButtonRequestProps> = ({
  user_id,
}) => {
  const { sendRequest, deleteRequest, isCreatingPenpal, isDeletingPenpal } =
    useSendPenpalRequest();
  const { userInformation, myPenpals } = useGlobalState();

  const isFriend = React.useMemo(() => {
    return myPenpals.some((pal) => {
      return (
        (pal.receiverId == user_id && pal.senderId == userInformation.id) ||
        (pal.receiverId == userInformation.id && pal.senderId == user_id)
      );
    });
  }, [myPenpals]);

  const penpalInstance = myPenpals.find((pal) => {
    return (
      (pal.receiverId == user_id && pal.senderId == userInformation.id) ||
      (pal.receiverId == userInformation.id && pal.senderId == user_id)
    );
  });
  return (
    <Button
      loading={isDeletingPenpal || isCreatingPenpal}
      onClick={
        isFriend && penpalInstance
          ? () => deleteRequest(penpalInstance?.id)
          : () => sendRequest({ receiverId: user_id })
      }
      disabled={isDeletingPenpal || isCreatingPenpal}
      className={`ml-auto px-8 h-10 rounded-full ${isFriend ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-primary-500'}`}
    >
      {isFriend ? 'Remove' : 'Connect'}
    </Button>
  );
};

export { PenpalShipButtonRequest };
