import { IUser } from './global';
import { IUserProfile } from '@/app/api/types';

export interface IStudentUser extends IUser {
  profile: IUserProfile;
}

export interface IStudents {
  id: number;
  status: number;
  schoolId: number;
  user: IStudentUser;
  userId: number;
}
