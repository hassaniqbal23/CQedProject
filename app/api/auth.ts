import http from '../utils/http';
import {
  IAcceptInvitation,
  IAuthentication,
  UpdatePasswordBody,
} from './types';

export const LoginAPI = (payload: IAuthentication) =>
  http.post('/auth/login', payload);

export const UpdateUserPassword = (payload: UpdatePasswordBody) =>
  http.patch('/password/update-password', payload);

export const GetUserInformation = (id: string) => http.get(`/users/${id}/user`);

export const UserAcceptInvitation = (payload: IAcceptInvitation) =>
  http.post('/invitation/accept-invite', payload);
export const UserForgetPassword = (payload: { email: string }) =>
  http.patch('/password/reset-password', payload);
