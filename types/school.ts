import { IAttachments } from './global';
import { ITeacher } from './tearcher';

export interface ISchoolProfile {
  Teacher?: ITeacher[];
  address: string;
  attachment: IAttachments;
  country: string;
  created_at: string;
  description: string;
  email: string;
  id: number;
  name: string;
  phone_number: string | null;
  state: string;
  status: number;
  updated_at: string;
}
