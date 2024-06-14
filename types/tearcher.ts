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

export interface ITeachers extends IStudents {}
export interface IEducation {
  countryCode: string;
  degree: string;
  educationLevel: string;
  endDate: string;
  fieldOfStudy: string;
  id: number;
  institution: string;
  startDate: string;
  userId: number;
}
export interface IWorkExperience {
  companyName: string;
  employmentType: string;
  endDate: string;
  id: number;
  location: string;
  startDate: string;
  title: string;
  userId: number;
}
export interface ITeacherProfile {
  attachment: IAttachment;
  education?: IEducation;
  workExperience: IWorkExperience;
  email: string;
  id: number;
  name: string;
  profile: IUserProfile;
  role: IRole;
}

export interface ITeacherProfileResponse {
  data: ITeacherProfile;
  message: string;
  status: boolean;
}
