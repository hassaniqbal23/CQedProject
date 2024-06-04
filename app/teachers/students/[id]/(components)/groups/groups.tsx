import { Typography } from '@/components/common/Typography/Typography';
import { GroupCard } from '@/components/common/GroupCard/GroupCard';
import React from 'react';
import { useQuery } from 'react-query';
import { getStudentCommunities } from '@/app/api/communities';
import { useParams } from 'next/navigation';
import Loading from '@/components/ui/button/loading';

interface IStudentGroup {
  userName: string;
}

export const StudentGroups = ({ userName }: IStudentGroup) => {
  const params = useParams();

  const {
    data: groupList,
    isLoading,
    error,
  } = useQuery('studentGroups', () => getStudentCommunities(params?.id as any));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] w-full">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error loading groups</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-9  px-8 py-3">
        <div className="col-span-8 ">
          <Typography variant="h3" weight="semibold">
            {`${userName}’s`} Joined Groups
          </Typography>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-9  gap-4 px-8 py-3">
        {groupList?.data.data.map((item: any) => (
          <div
            key={item.id}
            className="col-span-1 md:col-span-3 lg:grid-cols-8"
          >
            <GroupCard
              imageUrl={item.profile_picture.file_path}
              title={item.name}
              label={item._count.CommunityUsers}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
