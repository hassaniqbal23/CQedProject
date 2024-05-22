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
