import React, { FC, useEffect } from 'react';
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

interface IProps {
  module?: 'students' | 'teachers';
}
export const YourCommunity: FC<IProps> = ({ module = 'students' }) => {
  const route = useRouter();
  const client = useQueryClient();
  const { joinedCommunities } = useGlobalState();

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
    useQuery(['getCommunityJoined', 1, 10], () => getCommunityJoined(1, 10), {
      onSuccess() {
        client.refetchQueries('UserJoinedCommunities');
      },
    });

  const { data: mycommunity, isLoading: isFetchingMycommunity } = useQuery(
    ['getMyCommunity', 1, 10],
    () => getMyCommunity(1, 10)
  );

  return (
    <div>
      <Card className="rounded-xl px-5">
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
        </CardContent>
      </Card>
    </div>
  );
};
