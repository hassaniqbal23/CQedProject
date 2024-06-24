import { IAttachment } from '@/app/globalContext/types';
import { IUser } from './global';

export interface IFcmToken {
  token: string;
  userId: number;
}

export interface INotifications {
  body: string;
  createdById: number;
  createdByUser: IUser;
  attachment: IAttachment;
  created_at: string;
  file_path: string;
  name: string;
  id: number;
  isRead: boolean;
  notificationType: string;
  title: string;
  userId: number;
  schoolId: number;
  community_id: number | null;
  community_post_comment_id: number | null;
  community_post_like_id: number | null;
  community_user_id: number | null;
}

export interface ICommunityAcceptInvite {
  userId: number;
  communityId: number;
  status: string;
}
