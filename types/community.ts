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
