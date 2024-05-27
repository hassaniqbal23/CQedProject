import React from 'react';
import { CommunityHeader } from '../../ui/communityHeader/CommunityHeader';
import worldHand from '@/public/worldHand.svg';
import World from '@/public/World.svg';
import { PopularCommunitiesList } from '../PopularCommunitiesList/PopularCommunitiesList';
import { usePathname, useRouter } from 'next/navigation';

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
        title={'Find your CQED Community'}
        rightImage={worldHand}
        leftImage={World}
        subtitle="From gaming, to music, to learning, there’s a place for you."
        description="What are CQED Communities?"
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

      <div className="mt-5">
        <PopularCommunitiesList module={module} />
      </div>
    </div>
  );
};

export default CommunitiesPage;
