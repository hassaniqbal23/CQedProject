import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getCommunity,
  getSuggestedCommunities,
  joinCommunity,
} from '@/app/api/communities';
import { CommunityDetailsCard } from '../CommunityDetailsCard/CommnunityDetailsCard';
import { CommunityMembersCard } from '../CommunityMembersCard/CommunityMembersCard';
import { Feeds } from '../Feeds/Feeds';
import SuggestedCommunitySkeleton from '@/components/common/SuggestedCommunitiesSkeleton/SuggestedCommunitySkeleton';
import { Typography } from '@/components/common/Typography/Typography';
import { Card } from '@/components/ui';
import Coummuntiycard from '@/components/common/Communitycard/CommunityCard';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { IPenpal } from '@/app/globalContext/types';
import { useGlobalState } from '@/app/globalContext/globalContext';

interface IProps {
  module: 'teachers' | 'students';
}
const Community: FC<IProps> = ({ module }) => {
  const queryClient = useQueryClient();
  const { myPenpals, userInformation } = useGlobalState();
  const [communityId, setCommunityId] = useState<number | null>(null);
  const params = useParams();

  const { data: communities, isLoading } = useQuery(
    'community',
    () => getCommunity(params?.id),
    {
      enabled: params?.id ? true : false,
    }
  );

  const { data: suggestedCommunities, isLoading: suggestedCommunitiesLoading } =
    useQuery('suggestedCommunities', () => getSuggestedCommunities());

  console.log(suggestedCommunities);

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
          queryClient.refetchQueries('MyPenpals');
        },
      }
    );

  useEffect(() => {
    // queryClient.refetchQueries('UserJoinedCommunities');
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-10 gap-4 lg:gap-6">
        <div className="w-full col-span-1 md:col-span-4 lg:col-span-7 ">
          <CommunityDetailsCard
            loading={isLoading}
            communityId={communities?.data?.id}
            title={communities?.data?.name}
            image={communities?.data?.profile_picture?.file_path}
            members={communities?.data?._count?.CommunityUsers}
            description={communities?.data?.description}
            createdBy={communities?.data?.created_by}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <CommunityMembersCard
            loading={isLoading}
            members={communities?.data?.CommunityUsers}
            totalMembers={communities?.data?._count?.CommunityUsers}
            routeLink={module}
          />
        </div>
      </div>
      <div className="flex mt-6 gap-3 ">
        <Feeds communityId={communities?.data?.id} />
        <div className="w-[44%]">
          {suggestedCommunitiesLoading ? (
            <div>
              <SuggestedCommunitySkeleton />
            </div>
          ) : (
            <div>
              <Card className="mb-4 xl:whitespace-nowrap">
                <div className="px-3 xl:whitespace-nowrap">
                  <Typography
                    variant="h4"
                    weight="semibold"
                    className="flex whitespace-nowrap my-3"
                  >
                    Suggested Communities
                  </Typography>

                  {suggestedCommunities &&
                    suggestedCommunities?.data?.map(
                      (item: any, index: number) => {
                        const pendingPenpals = myPenpals.filter((i) => {
                          if (i.status === 'PENDING') {
                            return i;
                          }
                        });

                        const isPending = pendingPenpals.find(
                          (i: IPenpal) => i?.id === item?.User?.id
                        );
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
                                disabled: isPending ? true : false,
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
