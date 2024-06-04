import { Typography } from '@/components/common/Typography/Typography';
import { GroupCard } from '@/components/common/GroupCard/GroupCard';
import React from 'react';
import { useQuery } from 'react-query';
import { getStudentCommunities } from '@/app/api/communities';

export const StudentGroups = () => {
  // Step 3: Use useQuery to fetch data from the API
  const {
    data: groupList,
    isLoading,
    error,
  } = useQuery('studentGroups', () => getStudentCommunities(2));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading groups</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-9  px-8 py-3">
        <div className="col-span-8 ">
          <Typography variant="h3" weight="semibold">
            Moin’s Joined Groups
          </Typography>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-9  gap-4 px-8 py-3">
        {groupList?.data.data.map(
          (item: {
            id: React.Key | null | undefined;
            imageUrl: { src: string; width: number; height: number };
            title: string;
            label: string;
            description: string;
          }) => (
            <div
              key={item.id}
              className="col-span-1 md:col-span-3 lg:grid-cols-8"
            >
              <GroupCard
                imageUrl={item.imageUrl}
                title={item.title}
                label={item.label}
                description={item.description}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
