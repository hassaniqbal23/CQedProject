'use client';

import React, { useMemo, useState } from 'react';
import { Typography } from '@/components/common/Typography/Typography';
import { Button, Card, Input } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { Member } from './MemberCard';
import { getMyCommunityMembers } from '@/app/api/communities';
import { useQuery } from 'react-query';
import { useParams, useRouter } from 'next/navigation';
import { ICommunityMembers } from '@/types/community';
import { IUSER_ROLE } from '@/types/global';
import Pagination from '@/components/common/pagination/pagination';
import { debounce } from 'lodash';

export const AllMember = () => {
  const params = useParams();
  const route = useRouter();

  const [paginationsMembers, setPaginationsMembers] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });
  const { limit, page } = paginationsMembers;
  const [totalCount, setTotalCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: communityUser, isLoading } = useQuery(
    [
      `getMyCommunityMembers${params && params.id}`,
      params && params.id,
      page,
      limit,
      searchTerm,
    ],
    () =>
      getMyCommunityMembers(
        Number(params && params?.id),
        page,
        limit,
        searchTerm
      ),
    {
      onSuccess: (res) => {
        setTotalCount(res.total_count);
      },
      enabled: params?.id ? true : false,
    }
  );

  const admin = useMemo(
    () =>
      communityUser?.data?.filter(
        (item: ICommunityMembers) => item.communityRole === IUSER_ROLE.ADMIN
      ),
    [communityUser]
  );

  const allUsers = useMemo(
    () =>
      communityUser?.data?.filter(
        (item: ICommunityMembers) => item.communityRole === IUSER_ROLE.USER
      ),
    [communityUser]
  );

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 500),
    []
  );

  const usersLength = useMemo(
    () => (communityUser?.data?.length < 10 ? 1 : totalCount),
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
          onChange={(e) => debouncedSearch(e?.target?.value)}
          className="rounded-full w-8/12 md:w-4/12 "
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
              admin?.map((item: ICommunityMembers) => {
                return (
                  <Member
                    key={item?.id}
                    imgUrl={item?.attachment?.file_path}
                    fullName={
                      item?.name?.split(',').join(' ')?.slice(0, 17) || ''
                    }
                    username={
                      item?.name?.split(' ').join('_')?.slice(0, 17) || ''
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-3 lg:gap-y-10">
            {isLoading &&
              [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                return <Member loading={isLoading} key={item} />;
              })}
            {allUsers &&
              allUsers?.map((item: ICommunityMembers) => {
                return (
                  <Member
                    key={item?.id}
                    imgUrl={item?.attachment?.file_path}
                    fullName={
                      item?.name?.split(',').join(' ')?.slice(0, 17) || ''
                    }
                    username={
                      item?.name?.split(',').join('_')?.slice(0, 17) || ''
                    }
                  />
                );
              })}
          </div>
          <div className="flex justify-end py-5 mr-0 md:mr-32">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(usersLength / limit)}
              pageSize={limit}
              onPageChange={(value: number) => {
                setPaginationsMembers((prev) => ({
                  ...prev,
                  page: value,
                }));
              }}
              totalCount={usersLength}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
