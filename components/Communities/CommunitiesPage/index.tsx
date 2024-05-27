import React from 'react';
import { CommunityHeader } from '../../ui/communityHeader/CommunityHeader';
import worldHand from '@/public/worldHand.svg';
import World from '@/public/World.svg';
import { PopularCommunitiesList } from '../PopularCommunitiesList/PopularCommunitiesList';
import { usePathname, useRouter } from 'next/navigation';

const CommunitiesPage = () => {
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
        onInputChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            router.push(
              `${pathname}/community-search?q=${e.currentTarget.value}`
            );
          }
        }}
      />

      <div className="mt-5">
        <PopularCommunitiesList />
      </div>
    </div>
  );
};

export default CommunitiesPage;
