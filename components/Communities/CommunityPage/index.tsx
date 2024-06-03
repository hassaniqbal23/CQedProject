import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useQueryClient } from 'react-query';
import { getCommunity } from '@/app/api/communities';
import { CommunityDetailsCard } from '../CommunityDetailsCard/CommnunityDetailsCard';
import { CommunityMembersCard } from '../CommunityMembersCard/CommunityMembersCard';
import { Feeds } from '../Feeds/Feeds';

const Community = () => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { data: communities, isLoading } = useQuery(
    'community',
    () => getCommunity(params?.id),
    {
      enabled: params?.id ? true : false,
    }
  );

  useEffect(() => {
    // queryClient.refetchQueries('UserJoinedCommunities');
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-10 gap-4 lg:gap-6">
        <div className="w-full col-span-1 md:col-span-4 lg:col-span-7 ">
          <CommunityDetailsCard
            loading={isLoading}
            communityId={communities?.data.id}
            title={communities?.data.name}
            image={communities?.data.profile_picture.file_path}
            members={communities?.data?._count.CommunityUsers}
            description={communities?.data.description}
            createdBy={communities?.data?.created_by}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <CommunityMembersCard
            loading={isLoading}
            members={communities?.data.CommunityUsers}
            totalMembers={communities?.data._count.CommunityUsers}
          />
        </div>
      </div>
      <Feeds communityId={communities?.data.id} />
    </div>
  );
};

export default Community;
