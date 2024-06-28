import { useGlobalState } from '@/app/globalContext/globalContext';
import { Button, Dropdown } from '@/components/ui';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
import React from 'react';

export interface PenpalShipButtonRequestProps {
  user_id?: number | null | string;
  penpalStatus?: string;
  searchParams?: any;
  penpalId?: number;
}

const PenpalShipButtonRequest: React.FC<PenpalShipButtonRequestProps> = ({
  user_id,
  penpalStatus = '',
  searchParams,
  penpalId,
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
    <>
      {penpalInstance?.status === 'PENDING' ||
      isFriend ||
      penpalStatus === 'PENDING' ? (
        <Dropdown
          trigger={
            <Button
              loading={isDeletingPenpal}
              disabled={isDeletingPenpal}
              className={`ml-auto px-8 h-10 rounded-full bg-primary-50 text-primary-500`}
            >
              {penpalInstance?.status === 'PENDING' ||
              penpalStatus === 'PENDING'
                ? 'Pending'
                : isFriend
                  ? 'Friends'
                  : ''}
            </Button>
          }
          options={[
            {
              content: (
                <div
                  className="font-semibold text-red-500 bg-red-50 mx-auto"
                  onClick={() =>
                    deleteRequest({ user_id: Number(penpalId), searchParams })
                  }
                >
                  {penpalInstance?.status === 'PENDING' ||
                  penpalStatus === 'PENDING'
                    ? 'Cancel request'
                    : 'Unfriend'}
                </div>
              ),
            },
          ]}
        />
      ) : (
        <Button
          loading={isCreatingPenpal}
          onClick={() => sendRequest({ receiverId: user_id, searchParams })}
          disabled={isCreatingPenpal}
          className={`ml-auto px-8 h-10 rounded-full bg-primary-50 text-primary-500`}
        >
          Connect
        </Button>
      )}
    </>
  );
};

export { PenpalShipButtonRequest };
