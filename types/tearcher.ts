import { extend } from 'lodash';
import { IStudents } from './students';
import { IAttachment, IRole, IUserProfile } from '@/app/globalContext/types';

export interface ITeacher {
  id: number;
  fullname: string;
  email: string;
  gender: string;
  language: string;
  schoolId: number;
  status: number;
  created_at: string;
  updated_at: string;
}
