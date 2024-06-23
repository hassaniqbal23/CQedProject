import { Card } from '@/components/ui';
import React, { useState } from 'react';
import { Typography } from '../Typography/Typography';
import Coummuntiycard from '../Communitycard/CommunityCard';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { GlobalFriendConnect } from '../GlobalFriendsConnect/GlobalFriend';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getDashboardData } from '@/app/api/teachers';
import Loading from '@/components/ui/button/loading';
import { joinCommunity } from '@/app/api/communities';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { createPenpal } from '@/app/api/penpals';

function DashboardCards() {
  const queryClient = useQueryClient();
  const { userInformation, pendingCommunitiesList } = useGlobalState();
  const { module } = useModule();
  const [communityId, setCommunityId] = useState<number | null>(null);
  const [creatingPanpalId, setCreatingPanpalId] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery('dashboard', () =>
    getDashboardData()
  );

  const { mutate: joinCommunityAsMember, isLoading: isJoiningCommunity } =
    useMutation(
      'join_community',
      (communityId) =>
        joinCommunity({
          communityId: communityId,
          userId: userInformation.id,
          role: 'USER',
        }),
      {
        onSuccess: (res) => {
          setCommunityId(null);
          refetch();
          queryClient.refetchQueries('pending-communities');
        },
      }
    );

  const { mutate: sendPanpalRequest, isLoading: isCreatingPanpal } =
    useMutation((id: number) => createPenpal({ receiverId: id }), {
      onSuccess: (res) => {
        queryClient.refetchQueries('pending-friends');
        refetch();
        setCreatingPanpalId(null);
      },
      onError: (error) => {
        console.error(error, 'Error =====> log');
      },
    });

  return (
    <div className="sticky">
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          <Card className="mb-4 whitespace-nowrap">
            <div className="px-3 whitespace-nowrap">
              <Typography
                variant="h4"
                weight="semibold"
                className="flex whitespace-nowrap my-3"
              >
                Suggested Communities
              </Typography>

              {data?.data &&
                data?.data?.data.suggestedCommunities?.map(
                  (item: any, index: number) => {
                    const isPending = pendingCommunitiesList?.find(
                      (i) => item.id === i.communityId
                    )
                      ? true
                      : false;
                    return (
                      <div key={index} className="whitespace-nowrap">
                        <Coummuntiycard
                          className="bg-white "
                          totalMembers={item.member_count}
                          totalDiscussions={14000}
                          title={item.name}
                          imageSrc={item?.profile_picture?.file_path}
                          buttonProps={{
                            size: 'sm',
                            children: isPending ? 'Pending' : 'Join',
                            disabled: isPending,
                            onClick: () => {
                              joinCommunityAsMember(item.id);
                              setCommunityId(item.id);
                            },
                            loading:
                              isJoiningCommunity && communityId === item.id,
                          }}
                        />
                      </div>
                    );
                  }
                )}
              <Link
                href={`/${module}/cq-communities`}
                className="flex justify-center items-center text-primary-500 py-6"
              >
                Explore more communities
                <MoveRight className="ml-3" />
              </Link>
            </div>
          </Card>
          <Card>
            <div className="px-3">
              <Typography
                variant="h4"
                weight="semibold"
                className="flex whitespace-nowrap my-3"
              >
                Suggested Global Friends
              </Typography>
              {data?.data &&
                data?.data?.data.suggestedPenpals?.map(
                  (item: any, index: number) => (
                    <div key={index} className="mb-4">
                      <GlobalFriendConnect
                        name={item.name}
                        username={item.name}
                        imageUrl={item?.attachment?.file_path}
                        onConnect={() => {
                          sendPanpalRequest(item.id);
                          setCreatingPanpalId(item.id);
                        }}
                        isConnecting={
                          creatingPanpalId === item.id && isCreatingPanpal
                        }
                      />
                    </div>
                  )
                )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

export default DashboardCards;
