import { ITeacherCreate } from '@/components/common/teacherProfile/type';
import http from '../utils/http';

export interface IAcceptTeacherInvitation {
  inviteToken: string;
  type: string;
}

export const AcceptTeacherInvitation = (payload: IAcceptTeacherInvitation) =>
  http.post('/teachers/accept-invite', payload);

export const TeacherCreate = (payload: ITeacherCreate) =>
  http.post('/teachers/create', payload);
