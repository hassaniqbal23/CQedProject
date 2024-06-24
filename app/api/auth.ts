import { ICommunityAcceptInvite, IFcmToken } from '@/types/auth';
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

export const getProfileLoginUser = async () => {
  return http.get(`/users/get-profile`);
};

export const getProfileInfo = async (id: number) => {
  return http.get(`/users/${id}/view-profile`).then((res) => {
    return res.data;
  });
};

export const createNotifications = (payload: IFcmToken) =>
  http.post(`/notifications/create`, payload);

export const communityUserAcceptInvite = (payload: ICommunityAcceptInvite) =>
  http.post(`/community-user/accept-user-invite`, payload);

export const notificationMarkRead = (payload: { id?: number; status: true }) =>
  http.patch(`/notifications/read-notification`, payload);

export const deleteNotification = (id: number) =>
  http.delete(`/notifications/${id}/delete`);

export const getNotifications = (id: number) =>
  http.get(`/notifications/${id}/index`).then((res) => {
    return res.data.data;
  });
