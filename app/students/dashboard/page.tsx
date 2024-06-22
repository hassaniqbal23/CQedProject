'use client';
import React, { useState } from 'react';
import Coummuntiycard from '@/components/common/Communitycard/CommunityCard';
import { Post } from '@/components/common/Post/Post';
import { Card, Separator } from '@/components/ui';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { Typography } from '@/components/common/Typography/Typography';
import { NewFeeds } from '@/components/NewFeeds/NewFeeds';
import { GlobalFriendConnect } from '@/components/common/GlobalFriendsConnect/GlobalFriend';
import { CreatePostModal } from '@/components/common/CreatePostModal/CreatePostModal';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { createPost, getFeeds } from '@/app/api/feeds';
import Loading from '@/components/ui/button/loading';
import { IComment, ICommunityPost, ILike } from '@/types/global';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { CommentInput } from '@/components/Comment/CommentInput';
import { Comment } from '@/components/Comment/Comment';
import {
  communityPostComment,
  likeCommunityPost,
  unlikeCommunityPost,
} from '@/app/api/communities';
import DashboardFeeds from '@/components/DashboardFeeds/DashboardFeeds';
import DashboardCards from '@/components/common/DashboardCards/DashboardCards';

export default function StudentDashboard() {
  return (
    <div className="flex">
      <DashboardFeeds />
      <DashboardCards />
    </div>
  );
}
