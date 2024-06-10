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

export interface ChatUser {
  user: {
    id: number;
    name: string;
    email: string;
    attachment: {
      file_path: string;
      id: number;
    };
  };
  id: number;
}

export interface IMessage {
  id: string | number;
  message: string;
  created_at: string;
  attachments?: IAttachment[];
}

export interface IAttachment {
  id: number;
  file_path: string;
}
