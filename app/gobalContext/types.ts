export interface IUserInformation {
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
