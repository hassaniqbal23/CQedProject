'use client';

import { getCommunity, joinCommunity } from '@/app/api/communities';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { CommunityDetailsCard } from '@/components/Communities/CommunityDetailsCard/CommnunityDetailsCard';
import { CommunityMembersCard } from '@/components/Communities/CommunityMembersCard/CommunityMembersCard';
import { Feeds } from '@/components/Communities/Feeds/Feeds';
import Loading from '@/components/ui/button/loading';
import { CircleAlert } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const CQCommunity = () => {
  const params = useParams();
  const { userInformation, joinedCommunities } = useGlobalState();
  const { data, isLoading } = useQuery('community', () =>
    getCommunity(params?.id)
  );

  const { mutate: joinCommunityAsMember } = useMutation(
    'communities',
    () =>
      joinCommunity({
        communityId: params?.id,
        userId: userInformation.id,
        role: 'USER',
        status: 1,
      }),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
          icon: <CircleAlert />,
          closeButton: true,
        });
      },
    }
  );

  console.log(data);

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
                image={'/avatar1.svg'}
                members="5k"
                description={data?.data.description}
                isMember={joinedCommunities
                  .map((c) => c.id)
                  .includes(data?.data?.id)}
                onToggleMembership={() => {
                  joinCommunityAsMember();
                }}
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

export default CQCommunity;
