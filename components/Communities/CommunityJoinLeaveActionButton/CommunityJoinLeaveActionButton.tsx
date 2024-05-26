import { joinCommunity, leaveCommunity } from '@/app/api/communities';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { Button } from '@/components/ui';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

export interface CommunityJoinLeaveActionButtonProps {
  communityId: number | string;
}

const CommunityJoinLeaveActionButton: React.FC<
  CommunityJoinLeaveActionButtonProps
> = ({ communityId }) => {
  const queryClient = useQueryClient();

  const { joinedCommunities, userInformation } = useGlobalState();
  const isMember = React.useMemo(
    () =>
      joinedCommunities.findIndex((community) => community.id === communityId) >
      -1,
    [joinedCommunities]
  );

  const CommunityUserModel = React.useMemo(() => {
    return joinedCommunities.find((community) => community.id === communityId);
  }, [joinedCommunities]);

  const { mutate: joinCommunityAsMember, isLoading: isJoiningCommunity } =
    useMutation(
      'join_community',
      () =>
        joinCommunity({
          communityId: communityId,
          userId: userInformation.id,
          role: 'USER',
          status: 1,
        }),
      {
        onSuccess: (res) => {
          queryClient.refetchQueries('UserJoinedCommunities');
        },
      }
    );

  const { mutate: leaveCommunityAsMember, isLoading: isLeavingCommunity } =
    useMutation(
      'leave_community',
      () => leaveCommunity(communityId, userInformation.id),
      {
        onSuccess: (res) => {
          queryClient.refetchQueries('UserJoinedCommunities');
        },
      }
    );

  return (
    <Button
      onClick={
        isMember
          ? () => leaveCommunityAsMember()
          : () => joinCommunityAsMember()
      }
      disabled={isLeavingCommunity || isJoiningCommunity}
      className={`ml-auto py-2 px-4 rounded-full ${isMember ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-blue-600'}`}
    >
      {isMember ? 'Leave Group' : 'Join Group'}
    </Button>
  );
};

export { CommunityJoinLeaveActionButton };
