import { Typography } from '@/components/common/Typography/Typography';
import { GroupCard } from '@/components/common/GroupCard/GroupCard';
import React from 'react';

export const StudentGroups = () => {
  const groupList = [
    {
      title: 'Sharing your culture education',
      description:
        'Welcome to a place from where your sharing and learn about different..',
      imageUrl: {
        height: 198,
        src: '/assets/students/group2.svg',
        width: 298,
      },
      label: '5k Members',
    },
    {
      title: 'Sharing your culture education',
      description:
        'Welcome to a place from where your sharing and learn about different..',
      imageUrl: {
        height: 198,
        src: '/assets/students/group3.svg',
        width: 298,
      },
      label: '5k Members',
    },
    {
      title: 'Sharing your culture education',
      description:
        'Welcome to a place from where your sharing and learn about different..',
      imageUrl: {
        height: 198,
        src: '/assets/students/group1.svg',
        width: 298,
      },
      label: '5k Members',
    },
  ];
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
        {groupList.map((item) => {
          return (
            <div className="col-span-1 md:col-span-3 lg:grid-cols-8  ">
              <GroupCard
                imageUrl={item.imageUrl}
                title={item.title}
                label={item.label}
                description={item.description}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
