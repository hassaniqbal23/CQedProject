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

  const { data, isLoading } = useQuery(
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
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-3/4 ">
          <CommunityDetailsCard
            loading={isLoading}
            communityId={data?.data.id}
            title={data?.data.name}
            image={data?.data.profile_picture.file_path}
            members={data?.data?._count.CommunityUsers}
            description={data?.data.description}
          />
        </div>
        <div>
          <CommunityMembersCard
            loading={isLoading}
            members={data?.data.CommunityUsers}
            totalMembers={data?.data._count.CommunityUsers}
          />
        </div>
      </div>
      <Feeds communityId={data?.data.id} />
    </div>
  );
};

export default Community;
