import { joinCommunity, leaveCommunity } from '@/app/api/communities';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { Button, Dropdown } from '@/components/ui';
import { IoChevronDown } from 'react-icons/io5';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

export interface CommunityJoinLeaveActionButtonProps {
  communityId: number;
}

const CommunityJoinLeaveActionButton: React.FC<
  CommunityJoinLeaveActionButtonProps
> = ({ communityId }) => {
  const queryClient = useQueryClient();

  const { joinedCommunities, userInformation, pendingCommunitiesList } =
    useGlobalState();
  const isMember = React.useMemo(
    () =>
      joinedCommunities.findIndex((community) => community.id === communityId) >
      -1,
    [joinedCommunities]
  );

  const pendingCommunity = React.useMemo(() => {
    const isPending = pendingCommunitiesList.find(
      (community) => community.communityId === communityId
    );
    return isPending ? true : false;
  }, [pendingCommunitiesList]);

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
          queryClient.refetchQueries('pending-communities');
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
    <>
      {!isMember || pendingCommunity ? (
        <Button
          loading={isLeavingCommunity || isJoiningCommunity}
          onClick={
            isMember
              ? () => leaveCommunityAsMember()
              : () => joinCommunityAsMember()
          }
          disabled={
            isLeavingCommunity || isJoiningCommunity || pendingCommunity
          }
          className={`ml-auto py-2 px-8 rounded-full ${isMember ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-primary-500'}`}
        >
          {pendingCommunity ? 'Pending' : isMember ? 'Leave' : 'Join'}
        </Button>
      ) : (
        <Dropdown
          className="ml-auto"
          trigger={
            <Button
              loading={isLeavingCommunity || isJoiningCommunity}
              disabled={isLeavingCommunity || isJoiningCommunity}
              icon={<IoChevronDown />}
              iconPosition="right"
              className={` px-8 h-10 rounded-full bg-primary-50 text-primary-500`}
            >
              {pendingCommunity ? 'Pending' : isMember ? 'Joined' : 'Join'}
            </Button>
          }
          options={[
            {
              content: (
                <div
                  className="font-semibold text-red-500 bg-red-50 mx-auto"
                  onClick={
                    isMember
                      ? () => leaveCommunityAsMember()
                      : () => joinCommunityAsMember()
                  }
                >
                  {pendingCommunity ? 'Pending' : isMember ? 'Leave' : 'Join'}
                </div>
              ),
            },
          ]}
        />
      )}
    </>
  );
};

export { CommunityJoinLeaveActionButton };
