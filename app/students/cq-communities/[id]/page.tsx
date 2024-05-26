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

const guidelines = [
  'Respect and kindness: Treat all members with respect, regardless of their background, beliefs, or experiences. Be mindful of your words and actions, and remember that everyone is learning.',
  'Open-mindedness and curiosity: Embrace diverse perspectives and be open to learning from others.',
  'Accuracy and sensitivity: When sharing information about your culture, strive for accuracy and be mindful of potential sensitivities.',
  'Active participation: Contribute to the community by sharing your thoughts, experiences, and questions.',
  'No hate speech or discrimination: Harassment, hate speech, and discrimination of any kind are strictly prohibited.',
  'Respect and kindness: Treat all members with respect, regardless of their background, beliefs, or experiences. Be mindful of your words and actions, and remember that everyone is learning.',
  'Open-mindedness and curiosity: Embrace diverse perspectives and be open to learning from others.',
  'Accuracy and sensitivity: When sharing information about your culture, strive for accuracy and be mindful of potential sensitivities.',
  'Active participation: Contribute to the community by sharing your thoughts, experiences, and questions.',
  'No hate speech or discrimination: Harassment, hate speech, and discrimination of any kind are strictly prohibited.',
];

const membersImages = [
  '/avatar1.svg',
  '/avatar2.svg',
  '/avatar3.svg',
  '/avatar1.svg',
  '/avatar2.svg',
  '/avatar3.svg',
  '/avatar1.svg',
  '/avatar2.svg',
  '/avatar3.svg',
  '/avatar1.svg',
  '/avatar2.svg',
  '/avatar3.svg',
  '/avatar1.svg',
  '/avatar2.svg',
  '/avatar3.svg',
  '/avatar1.svg',
];

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
                title={data?.data.name}
                image={'/avatar1.svg'}
                members={data?.data?.CommunityUsers.length}
                description="Welcome! This is a vibrant space where individuals from all over the world connect, share their unique cultures, and learn from each other. What can you expect? To explore diverse perspectives; Ask questions and get answers; Share your own story; Celebrate differences; Make connections."
                guidelines={guidelines}
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
                memberImages={membersImages}
                totalMembers={data?.data?.CommunityUsers.length}
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
