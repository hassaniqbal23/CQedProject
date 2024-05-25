'use client';

import { CommunityDetailsCard } from '@/components/Communities/CommunityDetailsCard/CommnunityDetailsCard';
import { CommunityMembersCard } from '@/components/Communities/CommunityMembersCard/CommunityMembersCard';
import { Feeds } from '@/components/Communities/Feeds/Feeds';
import React from 'react';

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
  return (
    <div>
      <div className="flex gap-3">
        <div className="w-3/4">
          <CommunityDetailsCard
            title="Sharing our cultures."
            image={'/avatar1.svg'}
            members="5k"
            description="Welcome! This is a vibrant space where individuals from all over the world connect, share their unique cultures, and learn from each other. What can you expect? To explore diverse perspectives; Ask questions and get answers; Share your own story; Celebrate differences; Make connections."
            guidelines={guidelines}
            isMember={false}
            onToggleMembership={() => {
              console.log('clicked join group ');
            }}
          />
        </div>
        <div>
          <CommunityMembersCard
            memberImages={membersImages}
            totalMembers={12003}
          />
        </div>
      </div>
      <Feeds />
    </div>
  );
};

export default CQCommunity;
