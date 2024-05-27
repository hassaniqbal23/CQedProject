import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { getCommunity } from '@/app/api/communities';
import Loading from '@/components/ui/button/loading';
import { CommunityDetailsCard } from '../CommunityDetailsCard/CommnunityDetailsCard';
import { CommunityMembersCard } from '../CommunityMembersCard/CommunityMembersCard';
import { Feeds } from '../Feeds/Feeds';

const Community = () => {
  const params = useParams();
  const { data, isLoading } = useQuery('community', () =>
    getCommunity(params?.id)
  );

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-[500px] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-3/4">
              <CommunityDetailsCard
                communityId={data?.data.id}
                title={data?.data.name}
                image={data?.data.profile_picture.file_path}
                members={data?.data?._count.CommunityUsers}
                description={data?.data.description}
              />
            </div>
            <div>
              <CommunityMembersCard
                members={data?.data.CommunityUsers}
                totalMembers={data?.data._count.CommunityUsers}
              />
            </div>
          </div>
          <Feeds communityId={data?.data.id} />
        </>
      )}
    </div>
  );
};

export default Community;
