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
