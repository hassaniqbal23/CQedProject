import { IUserProfile } from '@/app/globalContext/types';
import { IUser } from './global';

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
