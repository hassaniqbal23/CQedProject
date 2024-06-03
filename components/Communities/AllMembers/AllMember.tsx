import React, { useMemo } from 'react';
import { Typography } from '@/components/common/Typography/Typography';
import { Button, Card, Input } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { Member } from './MemberCard';
import { getCommunity } from '@/app/api/communities';
import { useQuery } from 'react-query';
import { useParams, useRouter } from 'next/navigation';
import { ICommunityUsers } from '@/types/community';
import { IUSER_ROLE } from '@/types/global';

export const AllMember = () => {
  const params = useParams();
  const route = useRouter();

  const { data: communityUser, isLoading } = useQuery(
    'community',
    () => getCommunity(params?.id).then((res) => res.data),
    {
      enabled: params?.id ? true : false,
    }
  );

  const admin = useMemo(
    () =>
      communityUser?.CommunityUsers.filter(
        (item: ICommunityUsers) => item.role === IUSER_ROLE.ADMIN
      ),
    [communityUser]
  );

  const users = useMemo(
    () =>
      communityUser?.CommunityUsers.filter(
        (item: ICommunityUsers) => item.role === IUSER_ROLE.USER
      ),
    [communityUser]
  );

  return (
    <div>
      <Button
        onClick={() => route.back()}
        className="bg-transparent self-start text-black "
      >
        <ArrowLeft /> Back
      </Button>

      <Card className="p-8 rounded-xl">
        <Input
          type="search"
          iconPosition="left"
          iconColor="black"
          className="rounded-full w-4/12"
          placeholder="Search for Members"
        />

        <div>
          <Typography variant="h3" weight="bold" className="py-10">
            Admins
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {isLoading &&
              [1, 2, 3].map((i) => {
                return <Member loading={isLoading} key={i} />;
              })}
            {admin &&
              admin?.map((item: ICommunityUsers) => {
                return (
                  <Member
                    key={item?.User?.id}
                    imgUrl={item?.User?.attachment?.file_path}
                    fullName={
                      item?.User?.name?.split(',').join(' ')?.slice(0, 10) || ''
                    }
                    username={
                      item?.User?.name?.split(',').join('_')?.slice(0, 10) || ''
                    }
                  />
                );
              })}
          </div>
        </div>
        <div>
          <Typography variant="h3" weight="bold" className="py-10">
            Members
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {isLoading &&
              [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                return <Member loading={isLoading} key={item} />;
              })}
            {users &&
              users?.map((item: ICommunityUsers) => {
                return (
                  <Member
                    key={item?.User?.id}
                    imgUrl={item?.User?.attachment?.file_path}
                    fullName={
                      item?.User?.name?.split(',').join(' ')?.slice(0, 10) || ''
                    }
                    username={
                      item?.User?.name?.split(',').join('_')?.slice(0, 10) || ''
                    }
                  />
                );
              })}
          </div>
        </div>
      </Card>
    </div>
  );
};
