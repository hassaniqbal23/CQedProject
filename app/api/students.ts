import http from '../utils/http';
import { IStudentInfo } from './types';

export interface IAcceptStudentsInvitation {
  inviteToken: string;
  type: string;
}

export const AcceptStudentsInvitation = (payload: IAcceptStudentsInvitation) =>
    http.post('/invitation/accept-invite', payload);


export const StudentsCreate = (payload: IStudentInfo) =>
  http.post('/students/create', payload);
