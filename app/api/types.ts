export interface IAuthentication {
  name: string;
  password: string | number;
  remember?: boolean;
}

export interface IRegisterFrom {
  name: string;
  email: string;
  password: string;
}

export interface IStudentInfo {
  fullName: string;
  nickname: string;
  birthday: Date;
  country: any;
  gender: string;
  language: string;
}

export interface IAcceptInvitation {
  inviteToken: string;
}

export interface UpdatePasswordBody {
  password: string;
  confirm_password: string;
}

export interface IResetPassword {
  password: string;
  newPassword: string;
  code?: string;
}

export interface PenpalsSearchParams {
  ageRange?: number[];
  country?: string;
  interests?: string[];
  gender?: string;
  languages?: string[];
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
}

export interface ProfilesDetailPageProps {
  isFriend?: boolean;
  data?: any;
  setIsFriend?: (isFriend: boolean) => void;
}
