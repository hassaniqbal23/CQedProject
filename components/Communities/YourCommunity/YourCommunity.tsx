import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Typography } from '@/components/common/Typography/Typography';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
} from '@/components/ui';
import { Plus } from 'lucide-react';
import { CommunityCard } from '../CommunityCard2/CommunityCard2';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from 'react-query';
import {
  getCommunityJoined,
  getCommunityRequested,
  getMyCommunity,
} from '@/app/api/communities';
import { ICommunity, ICommunityJoined } from '@/types/community';
import { useGlobalState } from '@/app/globalContext/globalContext';
import Pagination from '@/components/common/pagination/pagination';

interface IProps {
  module?: 'students' | 'teachers';
}
export const YourCommunity: FC<IProps> = ({ module = 'students' }) => {
  const route = useRouter();
  const client = useQueryClient();
  const { joinedCommunities } = useGlobalState();

  const [paginationMycommunity, setPaginationMycommunity] = useState<{
    mycommunityPage: number;
    mycommunityLimit: number;
  }>({
    mycommunityPage: 1,
    mycommunityLimit: 10,
  });

  const [paginationCommunityJoined, setPaginationCommunityJoined] = useState<{
    communityJoinedPage: number;
    communityJoinedLimit: number;
  }>({
    communityJoinedPage: 1,
    communityJoinedLimit: 10,
  });

  const [paginationCommunitiesRequested, setPaginationCommunitiesRequested] =
    useState<{
      communitiesRequestedPage: number;
      communitiesRequestedLimit: number;
    }>({
      communitiesRequestedPage: 1,
      communitiesRequestedLimit: 10,
    });

  const { mycommunityPage, mycommunityLimit } = paginationMycommunity;
  const { communityJoinedPage, communityJoinedLimit } =
    paginationCommunityJoined;
  const { communitiesRequestedPage, communitiesRequestedLimit } =
    paginationCommunitiesRequested;

  // useEffect(() => {
  //   client.refetchQueries('UserJoinedCommunities')
  // }, [joinedCommunities])

  const {
    data: communitiesRequested,
    isLoading: isFetchingRequestedCommunities,
  } = useQuery(['getCommunityRequested', 1, 10], () =>
    getCommunityRequested(1, 10)
  );

  const { data: communityJoined, isLoading: isFetchingCommunityJoined } =
    useQuery(
      ['getCommunityJoined', communityJoinedPage, communityJoinedLimit],
      () => getCommunityJoined(communityJoinedPage, communityJoinedLimit),
      {
        onSuccess() {
          client.refetchQueries('UserJoinedCommunities');
        },
      }
    );

  const { data: mycommunity, isLoading: isFetchingMycommunity } = useQuery(
    ['getMyCommunity', mycommunityPage, mycommunityLimit],
    () => getMyCommunity(mycommunityPage, mycommunityLimit)
  );
  const mycommunityTotalCount = mycommunity?.totalCount || 0;
  const communityJoinedTotalCount = communityJoined?.totalCount || 0;
  const communitiesRequestedTotalCount = communitiesRequested?.totalCount || 0;

  return (
    <div>
      <Card className="rounded-xl px-5">
        <CardHeader className="p-5">
          <div className="flex items-center justify-between flex-wrap">
            <Typography
              variant="h4"
              weight="semibold"
              className="flex gap-3 items-end text-[24px]"
            >
              <Image
                src={'/yellowChart.svg'}
                alt="chart"
                className="w-10 h-10"
                width={25}
                height={25}
              />
              My Communities
            </Typography>

            <Button
              className="px-3 text-base rounded-lg"
              variant={'default'}
              icon={<Plus size={20} />}
              iconPosition="left"
              onClick={() => route.push('/students/cq-communities/create')}
            >
              Create New
            </Button>
          </div>
        </CardHeader>
        <Separator className="m-0" />

        <CardContent>
          {isFetchingCommunityJoined &&
            [1, 2, 3].map((i) => {
              return (
                <CommunityCard
                  loading={isFetchingCommunityJoined}
                  description={''}
                  title={''}
                  id={i}
                  members={0}
                  key={i}
                  image={''}
                  module={module ? module : 'students'}
                />
              );
            })}
          {mycommunity?.data?.length === 0 &&
            isFetchingCommunityJoined === false && (
              <div className="flex justify-center items-center h-40">
                <Typography variant="h5" weight="semibold">
                  You have not created any communities yet
                </Typography>
              </div>
            )}
          {mycommunity &&
            mycommunity?.data?.map((item: ICommunity, index: number) => {
              return (
                <CommunityCard
                  button={
                    <Button
                      className=" text-base bg-primary-50 text-primary-500 rounded-full py-2 px-8"
                      variant={'default'}
                      iconPosition="left"
                      onClick={() =>
                        route.push(`/${module}/cq-communities/${item.id}`)
                      }
                    >
                      View
                    </Button>
                  }
                  loading={isFetchingCommunityJoined}
                  description={item?.description}
                  title={item?.name}
                  id={item.id}
                  members={item?._count?.CommunityUsers}
                  key={index}
                  image={item?.profile_picture?.file_path}
                  module={module ? module : 'students'}
                />
              );
            })}
          {mycommunity?.data?.length > 9 && (
            <div className="flex justify-end py-3">
              <Pagination
                currentPage={mycommunityPage}
                totalPages={Math.ceil(mycommunityTotalCount / mycommunityLimit)}
                pageSize={mycommunityLimit}
                onPageChange={(pageNumber: number) => {
                  setPaginationMycommunity((prev) => ({
                    ...prev,
                    mycommunityPage: pageNumber,
                  }));
                }}
                totalCount={mycommunityTotalCount}
                setPageSize={(pageSize) =>
                  setPaginationMycommunity((prev) => ({
                    ...prev,
                    mycommunityLimit: pageSize,
                  }))
                }
              />
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="rounded-xl px-5 mt-10">
        <CardHeader className="p-5">
          <div className="flex items-center justify-between flex-wrap">
            <Typography
              variant="h4"
              weight="semibold"
              className="flex gap-3 items-end text-[24px]"
            >
              <Image
                src={'/yellowChart.svg'}
                alt="chart"
                className="w-10 h-10"
                width={25}
                height={25}
              />
              Communities you have joined
            </Typography>
          </div>
        </CardHeader>
        <Separator className="m-0" />
        <CardContent>
          {isFetchingMycommunity &&
            [1, 2, 3].map((i) => {
              return (
                <CommunityCard
                  loading={isFetchingMycommunity}
                  description={''}
                  title={''}
                  id={i}
                  members={0}
                  key={i}
                  image={''}
                  module={module ? module : 'students'}
                />
              );
            })}
          {communityJoined?.data?.length === 0 &&
            isFetchingMycommunity === false && (
              <div className="flex justify-center items-center h-40">
                <Typography variant="h5" weight="semibold">
                  You have not joined any communities yet
                </Typography>
              </div>
            )}
          {communityJoined &&
            communityJoined?.data?.map(
              (item: ICommunityJoined, index: number) => {
                return (
                  <CommunityCard
                    loading={false}
                    description={item.description}
                    title={item.name}
                    id={item.id}
                    members={item._count.CommunityUsers}
                    key={index}
                    image={item?.profile_picture.file_path}
                    module={module ? module : 'students'}
                  />
                );
              }
            )}
          {communityJoined?.data?.length > 9 && (
            <div className="flex justify-end py-3">
              <Pagination
                currentPage={communityJoinedPage}
                totalPages={Math.ceil(
                  communityJoinedTotalCount / communityJoinedLimit
                )}
                pageSize={communityJoinedLimit}
                onPageChange={(pageNumber: number) => {
                  setPaginationCommunityJoined((prev) => ({
                    ...prev,
                    communityJoinedPage: pageNumber,
                  }));
                }}
                totalCount={communityJoinedTotalCount}
                setPageSize={(pageSize) =>
                  setPaginationCommunityJoined((prev) => ({
                    ...prev,
                    communityJoinedLimit: pageSize,
                  }))
                }
              />
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="rounded-xl px-5 mt-10">
        <CardHeader className="p-5">
          <div className="flex items-center justify-between flex-wrap">
            <Typography
              variant="h4"
              weight="semibold"
              className="flex gap-3 items-end"
            >
              <Image
                src={'/yellowChart.svg'}
                alt="chart"
                className="w-10 h-10"
                width={25}
                height={25}
              />
              Communities you have Requested
            </Typography>
          </div>
        </CardHeader>
        <Separator className="m-0" />
        <CardContent>
          {isFetchingRequestedCommunities &&
            [1, 2, 3].map((i) => {
              return (
                <CommunityCard
                  loading={isFetchingRequestedCommunities}
                  description={''}
                  title={''}
                  id={i}
                  members={0}
                  key={i}
                  image={''}
                  module={module ? module : 'students'}
                />
              );
            })}
          {communitiesRequested?.data?.length === 0 &&
            isFetchingRequestedCommunities === false && (
              <div className="flex justify-center items-center h-40">
                <Typography variant="h5" weight="semibold">
                  You have not requested to join any communities yet
                </Typography>
              </div>
            )}
          {communitiesRequested &&
            communitiesRequested?.data?.map(
              (item: ICommunityJoined, index: number) => {
                return (
                  <CommunityCard
                    loading={false}
                    description={item.description}
                    title={item.name}
                    id={item.id}
                    members={item._count.CommunityUsers}
                    key={index}
                    image={item?.profile_picture.file_path}
                    module={module ? module : 'students'}
                  />
                );
              }
            )}
          {communitiesRequested?.data?.length > 9 && (
            <div className="flex justify-end py-3">
              <Pagination
                currentPage={communitiesRequestedPage}
                totalPages={Math.ceil(
                  communitiesRequestedTotalCount / communitiesRequestedLimit
                )}
                pageSize={communitiesRequestedLimit}
                onPageChange={(pageNumber: number) => {
                  setPaginationCommunitiesRequested((prev) => ({
                    ...prev,
                    communitiesRequestedPage: pageNumber,
                  }));
                }}
                totalCount={communitiesRequestedTotalCount}
                setPageSize={(pageSize) =>
                  setPaginationCommunitiesRequested((prev) => ({
                    ...prev,
                    communitiesRequestedLimit: pageSize,
                  }))
                }
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
