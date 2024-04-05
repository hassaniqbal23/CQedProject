
export interface IAuthentication {
  name: string;
  password: string | number;
  remember?: boolean;
}

export interface IRegisterFrom {
  name: string,
  email: string,
  password: string,
}