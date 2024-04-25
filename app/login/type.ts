export interface IApiResponse {
  message: string;
  status: boolean;
  result: LoginResult;
}

export interface LoginResult {
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  age: string; 
  roleId: number;
  status: number; 
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  permissionsJson: string;  
}
