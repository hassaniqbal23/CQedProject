import { joinCommunity, leaveCommunity } from '@/app/api/communities';
import { createPenpal, deletePenpal } from '@/app/api/penpals';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { Button } from '@/components/ui';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

export interface PenpalShipButtonRequestProps {
  user_id: number | string | undefined;
}

const PenpalShipButtonRequest: React.FC<PenpalShipButtonRequestProps> = ({
  user_id,
}) => {
  const queryClient = useQueryClient();

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

  const { mutate: addFriend, isLoading: isAddingFriend } = useMutation(
    (id: number | string | undefined) => createPenpal({ receiverId: id }),
    {
      onSuccess: (res) => {
        queryClient.refetchQueries('MyPenPals');
      },
      onError: (error) => {
        console.error(error, 'Error =====> log');
      },
    }
  );

  const { mutate: unfriend, isLoading: isRemovingFriend } = useMutation(
    (id: number) => deletePenpal(id),
    {
      onSuccess: () => {
        queryClient.refetchQueries('MyPenPals');
      },
      onError: (error) => {
        console.log('Error unblocking user', error);
      },
    }
  );

  return (
    <Button
      loading={isRemovingFriend || isAddingFriend}
      onClick={
        isFriend && penpalInstance
          ? () => unfriend(penpalInstance?.id)
          : () => addFriend(user_id)
      }
      disabled={isRemovingFriend || isAddingFriend}
      className={`ml-auto px-8 h-10 rounded-full ${isFriend ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-primary-500'}`}
    >
      {isFriend ? 'Remove' : 'Connect'}
    </Button>
  );
};

export { PenpalShipButtonRequest };
