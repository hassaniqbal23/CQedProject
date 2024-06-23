'use client';

import React from 'react';
import { MoveRight } from 'lucide-react';
import { Typography } from '@/components/common/Typography/Typography';
import Coummuntiycard from '@/components/common/Communitycard/CommunityCard';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { GlobalFriendConnect } from '@/components/common/GlobalFriendsConnect/GlobalFriend';
import DashboardFeeds from '@/components/DashboardFeeds/DashboardFeeds';
import DashboardCards from '@/components/common/DashboardCards/DashboardCards';

const Dashboard = () => {
  return (
    <div className="flex">
      <DashboardFeeds />
      <DashboardCards />
    </div>
  );
};

export default Dashboard;
