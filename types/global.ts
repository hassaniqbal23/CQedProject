import { IUserProfile } from '@/app/api/types';

enum FileType {
  JPG = 'JPG',
  PNG = 'PNG',
  JPEG = 'JPEG',
  SVG = 'SVG',
  PDF = 'PDF',
}

export enum IUSER_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export interface IAttachments {
  id: number;
  type?: FileType;
  file_name: string;
  file_size?: number;
  file_type?: string;
  file_path?: string;
  owner_id?: number;
  encrypted_flag: boolean;
  created_at: Date;
  updated_at: Date;
  upload_type?: string;
}

export interface IUser {
  id: number;
  schoolId: number;
  email: string;
  name: string;
  status: number;
  attachment?: IAttachments;
  last_active: string;
}

export interface IComment {
  id: number;
  communityPostId: number;
  userId: number;
  content: string;
  status: number;
  created_at: string;
  updated_at: string;
  User: {
    id?: number;
    name?: string;
    attachment: IAttachments;
  };
}

export interface ILike {
  id: number;
  communityPostId: number;
  userId: number;
  status: number;
  created_at: string;
  updated_at: string;
  User: IUser;
}

export interface ICount {
  comments: number;
  likes: number;
}

interface ISharedCommunityPost {
  id: number;
  communityId: number;
  userId: number;
  content: string;
  status: number;
  created_at: string;
  updated_at: string;
  community_post?: {
    id: number;
    file_path?: string;
    owner_id?: number;
  };
  User: IUser;
}

export interface ICommunityPost {
  id: number;
  communityId: number;
  userId: number;
  content: string;
  status: number;
  created_at: string;
  updated_at: string;
  pinned_post?: ISharedCommunityPost;
  pinned_post_id?: number;
  community_post?: {
    id: number;
    file_path?: string;
    owner_id?: number;
  };
  _count: ICount;
  User: IUser;
  comments: IComment[];
  likes: ILike[];
}

export interface IPenpalSearchResult {
  penpalStatus: string;
  penpalId: string | number;
  email: string;
  id: number;
  mutualFriends: number;
  name: string;
  attachment: IAttachments;
  profile: IUserProfile;
}
