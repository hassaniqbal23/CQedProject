import http from '../utils/http';
import {
  IAcceptInvitation,
  IAuthentication,
  IResetPassword,
  UpdatePasswordBody,
} from './types';

export const LoginAPI = (payload: IAuthentication) =>
  http.post('/auth/login', payload);

export const UpdateUserPassword = (payload: UpdatePasswordBody) =>
  http.patch('/password/update-password', payload);

export const GetUserInformation = (id: string) => http.get(`/users/me`);

export const GetUserJoinedCommunities = (id: string) =>
  http.get('/community/communities-joined');

export const UserAcceptInvitation = (payload: IAcceptInvitation) =>
  http.post('/invitation/accept-invite', payload);

export const UserResetPassword = (payload: IResetPassword) =>
  http.patch('/password/reset-password', payload);

export const UserForgotPassword = (payload: { email: string; type: string }) =>
  http.patch('/password/forgot-password', payload);
