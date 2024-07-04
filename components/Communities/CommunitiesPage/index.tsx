'use client';

import React from 'react';
import { CommunityHeader } from '../../ui/communityHeader/CommunityHeader';
import { PopularCommunitiesList } from '../PopularCommunitiesList/PopularCommunitiesList';
import { usePathname, useRouter } from 'next/navigation';
import { Card } from '@/components/ui';

interface CommunitiesPageProps {
  module: 'teachers' | 'students';
}

const CommunitiesPage: React.FC<CommunitiesPageProps> = (props) => {
  const module = props.module || 'students';
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <CommunityHeader
        title={'Find your GCEd Community'}
        rightImage={'/assets/students/map.svg'}
        leftImage={'/assets/students/communityGroup.svg'}
        subtitle="From gaming, to music, to learning, there’s a place for you."
        description="What are GCEd Communities?"
        createCommunityLink={
          module === 'students'
            ? '/students/cq-communities/create'
            : '/teachers/cq-communities/create'
        }
        onInputChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            if (module == 'students') {
              router.push(
                `/students/cq-communities/community-search?q=${e.currentTarget.value}`
              );
            } else {
              router.push(
                `/teachers/cq-communities/community-search?q=${e.currentTarget.value}`
              );
            }
          }
        }}
      />

      <Card className="mt-5 py-5 px-10 rounded-xl">
        <PopularCommunitiesList module={module} />
      </Card>
    </div>
  );
};

export default CommunitiesPage;
