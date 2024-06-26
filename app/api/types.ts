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
  fullname: string;
  nick_name: string;
  dob: any;
  country: any;
  gender: string;
  languages: { label: string; value: string }[];
  university?: string;
}
export interface ICreateStudent extends IStudentInfo {}

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
  age?: number;
}

export interface ProfilesDetailPageProps {
  isFriend?: boolean;
  isPending?: boolean;
  data?: any;
  buttonText?: string;
  setIsFriend?: (isFriend: boolean) => void;
  setIsPending?: (isPending: boolean) => void;
  handleClick?: () => void;
  isCreatingPenpal?: boolean;
  isDeletingPenpal?: boolean;
}
