import http from '../utils/http';

export const getAllSchools: any = (
  page: string | number = 1,
  pageSize: number | string = 10
) => {
  return http.get(`/schools/all-schools?page=${page}&limit=${pageSize}`);
};

export const getInvites = (
  page: string | number = 1,
  pageSize: number | string = 10
) => {
  return http.get(`/invitation/all-invites?page=${page}&limit=${pageSize}`);
};

export const getAdminDashboard = () => http.get('/dashbord/admin-dashbord');

export const deleteProfileImage = (id: number) =>
  http.delete(`/uploads/${id}/delete`);

export const uploadProfileImage = (file: FormData) =>
  http.post(`/me/picture`, file);

export const resendInvitation = (payload: { email: string; type: string }) =>
  http.post(`/invitation/resend-invite`, payload);

export const deleteInvitation = (id: number) =>
  http.delete(`/invitation/${id}/delete-invite`);

export const changePassword = (payload: {
  oldPassword: string;
  newPassword: string;
}) => http.patch(`/password/change-password`, payload);
