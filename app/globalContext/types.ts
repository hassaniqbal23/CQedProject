export interface BlockedFrom {
  User: {
    id: number;
    name: string;
    email: string;
    attachment: {
      file_path: string;
      id: number;
    };
  };
  blockedUserId: number;
  userId: number;
  id: number;
}

export interface IUserInformation {
  profile: {
    meta: {
      amazingThing: string;
      shareExploreLearn: string;
    };
    id: number;
    full_name: string;
    nick_name: string;
    country: string;
    dob: string;
    gender: string;
    languages: string[];
    culture_information: string[];
    interests: string[];
    bio: string;
  };
  id: number;
  name: string;
  email: string;
  age: string;
  roleId: number;
  status: number;
  attachment: {
    file_path: string;
    id: number;
  };
  BlockedFrom: BlockedFrom[];
}

interface IProfile {
  id: number;
  fullname: string;
  address: string;
  state: string;
  meta: string;
  language: string;
}

export interface IAttachment {
  id: number;
  file_path: string;
}

export interface IUser {
  id: number;
  email: string;
  profile: IProfile[];
  attachment?: IAttachment;
}

export interface IPenpal {
  id: number;
  senderId: number;
  receiverId: number;
  created_at: string;
  updated_at: string;
  schoolId: number;
  status: string;
  sender: IUser;
  receiver: IUser;
}

export interface ICommunityJoin {
  id: number;
  name: string;
  schoolId: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface IMessage {
  senderId?: number;
  id: string | number;
  message: string;
  created_at: string;
  attachments?: IAttachment[];
  clientID?: string;
  message_deleted_by: number[];
}

export interface IAttachment {
  id: number;
  file_path: string;
}

export interface IRole {
  description: string;
  id: number;
  name: string;
}

export interface IUserProfile {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  address: string;
  country?: string;
  state: string;
  meta: string;
  phone_number: string;
  gender: string;
  bio: string;
  zip_code: string;
  languages?: string[];
  culture_information?: string[];
  countriesWishToVisit?: string[];
  skills?: string[];
  hobbies?: string[];
  interests?: string[];
  dob: string;
  skypeId?: number | string;
}
