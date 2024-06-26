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
  educationLevel: string;
  endDate: string;
  fieldOfStudy: string;
  id?: number;
  institution: string;
  startDate: string;
}

export interface IWorkExperience extends IEducation {
  companyName: string;
  employmentType: string;
  location: string;
  title: string;
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
  school: {
    name: string;
  };
}

export interface ITeacherProfileResponse {
  data: ITeacherProfile;
  message: string;
  status: boolean;
}

export interface IMembers {
  User: {
    attachment: {
      file_path: string;
      id: number;
    };
    name?: string;
    id: number;
  };
}
