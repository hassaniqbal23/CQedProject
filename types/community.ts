import { IAttachment } from '@/app/globalContext/types';
import { IUSER_ROLE } from './global';

export interface ICommunityType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  _count: {
    Communities: number;
  };
}

export interface IProfilePicture {
  id: number;
  file_path: string;
}

export interface ICommunity {
  id: number;
  name: string;
  description: string;
  status: number;
  profile_picture: IProfilePicture;
  _count: {
    CommunityUsers: number;
  };
}

export interface ICommunitiesData {
  message: string;
  status: boolean;
  data: ICommunity[];
  totalCount: number;
}

export interface ICommunityUser {
  id: number;
  name: string;
  attachment: IProfilePicture;
}
export interface ICommunityUsers {
  User: ICommunityUser;
  role?: IUSER_ROLE;
}
export interface ICommunityMembers {
  communityRole?: IUSER_ROLE;
  email: string;
  id: number;
  name: string;
  attachment: IAttachment;
}

export interface ICommunityJoined extends ICommunity {
  created_at: string;
  id: number;
  schoolId: number;
  status: number;
  updated_at: string;
}
