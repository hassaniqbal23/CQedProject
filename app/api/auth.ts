import http from '../utils/http';
import {
  IAcceptInvitation,
  IAuthentication,
  UpdatePasswordBody,
} from './types';

export const LoginAPI = (payload: IAuthentication) =>
  http.post('/auth/login', payload);

export const CreateStudentUser = (payload: IAuthentication) =>
  http.post('/students/create', payload);

export const UpdateUserPassword = (payload: UpdatePasswordBody) =>
  http.patch('/password/update-password', payload);

export const GetUserInfomation = (id: string) => http.get(`/users/${id}/user`);

export const UserAcceptInvitation = (payload: IAcceptInvitation) =>
  http.post('/invitation/accept-invite', payload);
